Entidades Principales
Usuario

id_usuario (PK)

nombre

email (único)

contraseña (hash)

direccion

telefono

es_admin (booleano)

fecha_registro

ultimo_login

Producto

id_producto (PK)

nombre

descripcion

precio

stock

categoria

imagen_url (referencia a servicio en la nube)

fecha_creacion

fecha_actualizacion

activo (booleano)

Orden

id_orden (PK)

id_usuario (FK)

fecha_orden

estado (pendiente/completada/cancelada)

total

direccion_envio

metodo_pago

DetalleOrden

id_detalle (PK)

id_orden (FK)

id_producto (FK)

cantidad (en este caso siempre 1 según requisitos)

precio_unitario

subtotal

Relaciones
Usuario-Orden: Uno a muchos (1 usuario puede tener N órdenes)

Orden-DetalleOrden: Uno a muchos (1 orden puede tener N detalles)

Producto-DetalleOrden: Uno a muchos (1 producto puede estar en N detalles de orden)

Consideraciones adicionales
Autenticación: El campo es_admin determinará los permisos del usuario

Carrito: Podrías considerar una entidad temporal Carrito si necesitas persistencia antes de generar la orden

Imágenes: Las URLs de imágenes apuntarán a un servicio de almacenamiento en la nube como AWS S3 o Cloudinary

Seguridad: Las contraseñas deben almacenarse hasheadas (considera bcrypt)

Diagrama Conceptual
+-------------+       +-------------+       +-------------+
|   USUARIO   |       |    ORDEN    |       |  PRODUCTO   |
+-------------+       +-------------+       +-------------+
| PK: id      |<----->| PK: id      |       | PK: id      |
|    nombre   |  1:N  | FK: id_user |  N:M  |    nombre   |
|    email    |       |    fecha    |       |    precio   |
|    password |       |    estado   |       |    stock    |
|    es_admin |       |    total    |       +-------------+
+-------------+       +-------------+
                             ^
                             |
                             | 1:N
                             |
                     +-------------+
                     | DETALLE_ORD|
                     +-------------+
                     | PK: id      |
                     | FK: id_orden|
                     | FK: id_prod |
                     | cantidad=1  |
                     | precio_unit|
                     +-------------+