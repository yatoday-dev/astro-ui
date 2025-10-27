import yaml from 'js-yaml';
import fs from 'node:fs';

/**
 * Interpolates environment variables in a string.
 * Supports patterns: ${VAR} and ${VAR:default}
 *
 * @param content - String content to process
 * @returns String with environment variables replaced
 *
 * @example
 * // With env var set: SITE_URL=https://prod.example.com
 * interpolateEnvVars('${SITE_URL:https://example.com}')
 * // Returns: 'https://prod.example.com'
 *
 * // Without env var set:
 * interpolateEnvVars('${SITE_URL:https://example.com}')
 * // Returns: 'https://example.com'
 */
const interpolateEnvVars = (content: string): string => {
  return content.replace(
    /\$\{([A-Z_][A-Z0-9_]*):?([^}]*)\}/g,
    (match, varName, defaultValue) => {
      const envValue = process.env[varName];

      // If env var exists, use it
      if (envValue !== undefined) {
        return envValue;
      }

      // If default value provided, use it
      if (defaultValue !== '') {
        return defaultValue;
      }

      // Otherwise, keep the original placeholder
      return match;
    }
  );
};

const loadConfig = async (configPathOrData: string | object) => {
  if (typeof configPathOrData === 'string') {
    let content = fs.readFileSync(configPathOrData, 'utf8');

    if (configPathOrData.endsWith('.yaml') || configPathOrData.endsWith('.yml')) {
      // Interpolate environment variables before parsing YAML
      content = interpolateEnvVars(content);
      return yaml.load(content);
    }

    return content;
  }

  return configPathOrData;
};

export default loadConfig;
