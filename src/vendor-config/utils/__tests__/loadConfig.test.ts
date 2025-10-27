import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import loadConfig from '../loadConfig';

describe('loadConfig - Environment Variable Interpolation', () => {
  let tmpDir: string;
  let configPath: string;

  beforeEach(() => {
    // Create a temporary directory for test files
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vendor-config-test-'));
    configPath = path.join(tmpDir, 'test-config.yaml');
  });

  afterEach(() => {
    // Clean up temporary files
    if (fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it('should replace environment variables with their values', async () => {
    process.env.TEST_SITE_URL = 'https://prod.example.com';
    process.env.TEST_API_KEY = 'secret123';

    const yamlContent = `
site:
  url: '\${TEST_SITE_URL}'
  api_key: '\${TEST_API_KEY}'
`;

    fs.writeFileSync(configPath, yamlContent, 'utf8');
    const config = await loadConfig(configPath);

    expect(config).toEqual({
      site: {
        url: 'https://prod.example.com',
        api_key: 'secret123',
      },
    });

    delete process.env.TEST_SITE_URL;
    delete process.env.TEST_API_KEY;
  });

  it('should use default values when environment variables are not set', async () => {
    const yamlContent = `
site:
  url: '\${UNDEFINED_VAR:https://default.example.com}'
  port: '\${UNDEFINED_PORT:3000}'
`;

    fs.writeFileSync(configPath, yamlContent, 'utf8');
    const config = await loadConfig(configPath);

    expect(config).toEqual({
      site: {
        url: 'https://default.example.com',
        port: '3000',
      },
    });
  });

  it('should prefer environment variable over default value', async () => {
    process.env.TEST_WITH_DEFAULT = 'from-env';

    const yamlContent = `
site:
  value: '\${TEST_WITH_DEFAULT:default-value}'
`;

    fs.writeFileSync(configPath, yamlContent, 'utf8');
    const config = await loadConfig(configPath);

    expect(config).toEqual({
      site: {
        value: 'from-env',
      },
    });

    delete process.env.TEST_WITH_DEFAULT;
  });

  it('should keep placeholder when env var is not set and no default provided', async () => {
    const yamlContent = `
site:
  value: '\${UNDEFINED_NO_DEFAULT}'
`;

    fs.writeFileSync(configPath, yamlContent, 'utf8');
    const config = await loadConfig(configPath);

    expect(config).toEqual({
      site: {
        value: '${UNDEFINED_NO_DEFAULT}',
      },
    });
  });

  it('should handle multiple environment variables in the same file', async () => {
    process.env.TEST_HOST = 'example.com';
    process.env.TEST_PROTOCOL = 'https';
    process.env.TEST_PORT = '8080';

    const yamlContent = `
site:
  protocol: '\${TEST_PROTOCOL:http}'
  host: '\${TEST_HOST:localhost}'
  port: '\${TEST_PORT:3000}'
  base_url: '\${TEST_PROTOCOL}://\${TEST_HOST}:\${TEST_PORT}'
`;

    fs.writeFileSync(configPath, yamlContent, 'utf8');
    const config = await loadConfig(configPath);

    expect(config).toEqual({
      site: {
        protocol: 'https',
        host: 'example.com',
        port: '8080',
        base_url: 'https://example.com:8080',
      },
    });

    delete process.env.TEST_HOST;
    delete process.env.TEST_PROTOCOL;
    delete process.env.TEST_PORT;
  });

  it('should handle numeric values from environment variables', async () => {
    process.env.TEST_TIMEOUT = '5000';
    process.env.TEST_MAX_RETRIES = '3';

    const yamlContent = `
config:
  timeout: \${TEST_TIMEOUT:3000}
  max_retries: \${TEST_MAX_RETRIES:5}
`;

    fs.writeFileSync(configPath, yamlContent, 'utf8');
    const config = await loadConfig(configPath);

    // YAML will parse unquoted numbers as numbers
    expect(config).toEqual({
      config: {
        timeout: 5000,
        max_retries: 3,
      },
    });

    delete process.env.TEST_TIMEOUT;
    delete process.env.TEST_MAX_RETRIES;
  });

  it('should handle boolean-like values from environment variables', async () => {
    process.env.TEST_ENABLED = 'true';
    process.env.TEST_DEBUG = 'false';

    const yamlContent = `
config:
  enabled: \${TEST_ENABLED:false}
  debug: \${TEST_DEBUG:true}
`;

    fs.writeFileSync(configPath, yamlContent, 'utf8');
    const config = await loadConfig(configPath);

    // YAML will parse unquoted booleans as booleans
    expect(config).toEqual({
      config: {
        enabled: true,
        debug: false,
      },
    });

    delete process.env.TEST_ENABLED;
    delete process.env.TEST_DEBUG;
  });

  it('should work with object config passed directly', async () => {
    const configObj = {
      site: {
        url: 'https://example.com',
      },
    };

    const config = await loadConfig(configObj);

    expect(config).toEqual(configObj);
  });

  it('should handle colons in default values correctly', async () => {
    const yamlContent = `
site:
  url: '\${UNDEFINED_URL:https://example.com:8080/path}'
`;

    fs.writeFileSync(configPath, yamlContent, 'utf8');
    const config = await loadConfig(configPath);

    expect(config).toEqual({
      site: {
        url: 'https://example.com:8080/path',
      },
    });
  });
});
