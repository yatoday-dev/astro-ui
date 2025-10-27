# Vendor Config Integration

A custom Astro integration that loads YAML configuration files and provides them as a virtual module with native environment variable support.

## Features

- **YAML Configuration Loading**: Load configuration from `.yaml` or `.yml` files
- **Environment Variable Interpolation**: Native support for environment variables with default values
- **Virtual Module**: Access configuration via `vendor:config` import
- **Auto-generated TypeScript Definitions**: Type-safe configuration access
- **Hot Reload**: Automatic reload on configuration file changes during development
- **robots.txt Integration**: Automatically updates robots.txt with sitemap reference

## Installation

This integration is built-in to `@yatoday/astro-ui`. To use it in your Astro project:

```javascript
// astro.config.mjs
import vendorConfig from '@yatoday/astro-ui/vendor-config';

export default defineConfig({
  integrations: [
    vendorConfig({
      config: 'src/config.yaml' // Path to your config file
    })
  ]
});
```

## Environment Variable Support

The integration natively supports environment variable interpolation in YAML configuration files using the `${VAR:default}` syntax.

### Syntax

- **With default value**: `${VAR_NAME:default_value}`
- **Without default**: `${VAR_NAME}`

### Behavior

1. If the environment variable is set, its value is used
2. If the environment variable is not set and a default is provided, the default is used
3. If the environment variable is not set and no default is provided, the placeholder remains unchanged

### Examples

#### Example 1: Basic Usage

**config.yaml**:
```yaml
site:
  name: 'My Site'
  url: '${SITE_URL:https://example.com}'
  api_key: '${API_KEY}'
```

**With environment variables set**:
```bash
SITE_URL=https://prod.example.com
API_KEY=secret123
```

**Result**:
```javascript
{
  site: {
    name: 'My Site',
    url: 'https://prod.example.com',
    api_key: 'secret123'
  }
}
```

**Without environment variables**:
```javascript
{
  site: {
    name: 'My Site',
    url: 'https://example.com',  // Uses default
    api_key: '${API_KEY}'         // Placeholder preserved
  }
}
```

#### Example 2: Multi-Environment Setup

**config.yaml**:
```yaml
site:
  site: '${SITE_URL:https://localhost:3000}'
  base: '${BASE_PATH:/}'

metadata:
  title:
    default: '${SITE_NAME:My App}'

analytics:
  vendors:
    googleAnalytics:
      id: '${GA_ID:}'
```

**Development (.env.development)**:
```bash
SITE_URL=http://localhost:4321
BASE_PATH=/
SITE_NAME=My App (Dev)
# GA_ID not set - uses empty default
```

**Production (environment variables)**:
```bash
SITE_URL=https://production.example.com
BASE_PATH=/app
SITE_NAME=My Production App
GA_ID=G-XXXXXXXXXX
```

#### Example 3: Numeric and Boolean Values

**config.yaml**:
```yaml
config:
  # Unquoted values will be parsed as their YAML type
  timeout: ${TIMEOUT:5000}           # Number
  max_retries: ${MAX_RETRIES:3}      # Number
  debug: ${DEBUG:false}              # Boolean
  enabled: ${ENABLED:true}           # Boolean

  # Quoted values remain as strings
  port: '${PORT:3000}'               # String
```

#### Example 4: Complex URLs with Colons

**config.yaml**:
```yaml
api:
  # Colons in default values are handled correctly
  endpoint: '${API_ENDPOINT:https://api.example.com:8080/v1}'
  websocket: '${WS_URL:wss://ws.example.com:9000/socket}'
```

#### Example 5: Composed Values

**config.yaml**:
```yaml
site:
  protocol: '${PROTOCOL:https}'
  host: '${HOST:example.com}'
  port: '${PORT:443}'

  # Combine multiple environment variables
  full_url: '${PROTOCOL}://${HOST}:${PORT}'
```

### Variable Naming Rules

Environment variable names must:
- Start with an uppercase letter or underscore (`A-Z`, `_`)
- Contain only uppercase letters, numbers, or underscores (`A-Z`, `0-9`, `_`)

**Valid**: `SITE_URL`, `API_KEY`, `_INTERNAL_VAR`, `CONFIG_V2`

**Invalid**: `siteUrl`, `api-key`, `123VAR`

## Usage in Your Code

Once the integration is configured, import the configuration in your Astro components or pages:

```astro
---
import { SITE, METADATA, ANALYTICS } from 'vendor:config';
---

<head>
  <title>{METADATA.title.default}</title>
  <meta name="description" content={METADATA.description} />
  <link rel="canonical" href={SITE.site} />
</head>
```

## Configuration Structure

The integration expects a YAML file with the following optional sections:

```yaml
site:
  site: string          # Main site URL
  base: string          # Base path for deployment
  trailingSlash: boolean

metadata:
  title:
    default: string
    template: string
  description: string
  robots:
    index: boolean
    follow: boolean
  openGraph: { ... }
  twitter: { ... }

i18n:
  language: string
  textDirection: string

apps:
  blog:
    isEnabled: boolean
    postsPerPage: number
    # ... blog configuration

analytics:
  vendors:
    googleAnalytics:
      id: string | null

ui:
  theme: string         # 'system' | 'light' | 'dark' | 'light:only' | 'dark:only'
```

## Advanced: Passing Configuration Directly

You can also pass configuration as a JavaScript object instead of a file path:

```javascript
// astro.config.mjs
export default defineConfig({
  integrations: [
    vendorConfig({
      config: {
        site: {
          name: 'My Site',
          site: 'https://example.com'
        }
      }
    })
  ]
});
```

Note: Environment variable interpolation only works with YAML files, not with direct object configuration.

## Benefits Over Manual Preprocessing

This native implementation offers several advantages:

1. **No Build Scripts Required**: Environment variables are processed automatically during the Astro build
2. **Hot Reload Support**: Configuration changes (including env var updates) are reflected immediately during development
3. **Type Safety**: Auto-generated TypeScript definitions provide intellisense and type checking
4. **Standard Syntax**: Uses familiar `${VAR:default}` syntax common in many configuration systems
5. **Clean Integration**: Works seamlessly with Astro's build pipeline

## Migration from Prebuild Scripts

If you're currently using a prebuild script for environment variable substitution:

1. **Remove** your prebuild script from `package.json`
2. **Update** your `config.yaml` to use the `${VAR:default}` syntax
3. **Rebuild** your project - environment variables will be processed automatically

**Before** (with prebuild script):
```json
{
  "scripts": {
    "prebuild": "node scripts/process-env-vars.js",
    "build": "astro build"
  }
}
```

**After** (native support):
```json
{
  "scripts": {
    "build": "astro build"
  }
}
```

## Troubleshooting

### Environment variable not being replaced

1. **Check variable name format**: Must be uppercase with underscores (e.g., `SITE_URL`, not `siteUrl`)
2. **Verify quotes**: YAML strings should be quoted: `'${VAR:default}'`
3. **Check environment**: Ensure the variable is set in your environment or deployment platform

### Type mismatch errors

- YAML parses unquoted values according to type
- Use quotes for string values: `'${PORT:3000}'` → string `'3000'`
- Omit quotes for numbers/booleans: `${PORT:3000}` → number `3000`

### Default value with colons not working

- The integration correctly handles colons in default values
- Example: `${URL:https://example.com:8080}` works correctly
- Always quote URLs to prevent YAML parsing issues: `'${URL:https://example.com:8080}'`
