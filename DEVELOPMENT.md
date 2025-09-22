# 开发环境配置

## 环境变量配置（可选）

### 方法1：使用环境变量文件
创建 `.env.local` 文件来设置开发环境变量：

```bash
# 设置开发环境使用的 Stripe Price ID
REACT_APP_STRIPE_PRICE_ID=price_test_1234567890:payment
```

### 方法2：直接设置环境变量
```bash
# 在启动开发服务器前设置
export REACT_APP_STRIPE_PRICE_ID=price_test_1234567890:payment
npm start
```

### 默认行为
- **开发环境**: 使用 `REACT_APP_STRIPE_PRICE_ID` 或默认测试ID
- **生产环境**: 使用生产环境的Price ID
- **如果不设置**: 将使用默认的生产环境 Price ID

## API 代理配置

开发环境已经配置了API代理，所有 `/app-api` 路径的请求都会被代理到 `http://localhost:9000`。

### 启动开发服务器

```bash
npm start
```

### 代理配置说明

- **代理路径**: `/app-api/*`
- **目标服务器**: `http://localhost:9000`
- **配置位置**: `docusaurus.config.ts` 中的 `addAliasPlugin`

### 测试代理

1. 确保后端服务器在 `http://localhost:9000` 运行
2. 启动前端开发服务器: `npm start`
3. 访问 `http://localhost:3000/test-proxy.html` 测试代理功能

### API 端点

- `POST /app-api/stripe-checkout-session` - Stripe 支付会话创建
- `POST /app-api/linguax/admin/license` - License 创建

### 注意事项

- 代理仅在开发环境 (`npm start`) 中生效
- 生产环境构建 (`npm run build`) 不会使用代理
- 确保后端服务器在 `localhost:9000` 运行，否则API请求会失败
