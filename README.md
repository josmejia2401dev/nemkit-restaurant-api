# Nemkit Restaurant API

Backend de **restaurante** construido sobre `nemkit`.

## Alcance

- Mesas y comandas.
- Cocina con preparación (`pending -> preparing -> ready`).
- Domicilios con sincronización de cocina.
- Meseros, cocineros, cajeros, vendedores, domiciliarios y bodega.
- Productos simples, insumos y platos preparados con receta.
- Compras, proveedores, movimientos, clientes, caja y reportes.

Sin plan separe en el MVP.

## Foundation

La autenticación, usuarios, empleados, tokens, feedback, límites y panel `sys`
viven en `nemkit` y se montan con `createFoundation`.

```text
/api/v1/restaurant/foundation/auth/...
/api/v1/restaurant/foundation/users/...
/api/v1/restaurant/foundation/employees/...
/api/v1/restaurant/foundation/limits
/api/v1/restaurant/foundation/feedback
/api/v1/restaurant/foundation/sys/...
```

## Roles

`ADMIN`, `CASHIER`, `SELLER`, `WAITER`, `COOK`, `COURIER`, `WAREHOUSE`.

## Flujo de pedido

```text
En sitio:  pending -> preparing -> ready -> delivered
Domicilio: pending -> preparing -> ready -> on_route -> delivered
Cancelación: -> cancelled
```

La cocina mueve `preparing` y `ready`; el domiciliario mueve `on_route` y
`delivered`.

## Endpoints principales

```text
GET/POST /api/v1/restaurant/products
GET/POST /api/v1/restaurant/categories
GET/POST /api/v1/restaurant/purchases
GET/POST /api/v1/restaurant/suppliers
GET/POST /api/v1/restaurant/customers
GET/POST /api/v1/restaurant/sales
PUT      /api/v1/restaurant/sales/:id/pay
PUT      /api/v1/restaurant/sales/:id/status
PUT      /api/v1/restaurant/sales/:id/cancel
GET      /api/v1/restaurant/kitchen
PUT      /api/v1/restaurant/kitchen/:id
PUT      /api/v1/restaurant/kitchen/:id/cancel
GET/POST /api/v1/restaurant/tables
GET      /api/v1/restaurant/tables/occupancy
GET/POST /api/v1/restaurant/deliveries
PUT      /api/v1/restaurant/deliveries/:id/status
GET      /api/v1/restaurant/reports/...
GET      /api/v1/restaurant/dashboard/...
```

## Ejecución local

```bash
cp .env.example .env
npm install
npm run dev
```

## Verificación de cuenta con OTP

El registro de empresa no inicia sesión hasta confirmar el correo. El OTP se
guarda hasheado en `foundation_users`, vence a los 10 minutos y se limpia al
usarse.

```text
POST /foundation/auth/users/register
POST /foundation/auth/users/verify-email
POST /foundation/auth/users/resend-verification
```

El correo se envía por Notify. Configura:

```env
NOTIFY_API_URL=
NOTIFY_API_KEY=
OTP_TTL_MINUTES=10
OTP_LENGTH=6
OTP_MAX_ATTEMPTS=5
OTP_RESEND_COOLDOWN_SECONDS=60
OTP_SECRET=
```

El correo y la pantalla de verificación advierten que el mensaje puede llegar a
spam.
