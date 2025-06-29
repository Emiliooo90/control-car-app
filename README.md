# Test Práctico Frontend – Control Car

## 📋 Parte 1 – Propuesta Visual

### Preguntas a responder y respuestas:
- ¿Qué mejorarías de este flujo?
    R: Lo que mejoraría de este flujo primero serían varios elementos, la sección del calendario ajustaría más su tamaño primero junto con sus botones y flechas.
    También en el componente del chat ajustaría su tamaño haciendolo más pequeño, para poder tener la posibilidad de agregar mas componentes de acceso rápido y sea más intuitivo para el cliente.
    En el vídeo también mejoraría la sección de crear el presupuesto para el cliente, por ejemplo los modals actuales, son confusos para el cliente que se abra uno tras otro, confunde la experiencia del cliente mientras navega, al menos a mi me paso.
- ¿Cómo lo harías más claro, usable o eficiente?
    R: Como lo haría mas claro, lo primero sería ajustar el tamaño de cada uno de los elementos que ocupan un espacio innecesario, como el calendario y el chat. Haría una sección de dashboard donde ahí salga el calendario junto con unos botones de accesos rápidos.
    En la sección de creación de presupuesto lo dejaría en otra sección y eliminaría al menos un modal, para mejorar la usabilidad.
    Dejaría solo el modal para elegir los productos para agregar al carrito.
- Diseña una propuesta visual e impleméntala en Angular y SCSS
- Agregar por lo menos un botón funcional (puede ser el de agregar un nuevo conjunto de productos o el de agregar productos)

## 🔍 Parte 2 – Análisis Crítico
Analiza la siguiente imagen **<ANEXO 1>** y responde estas preguntas:

- ![image](https://github.com/user-attachments/assets/b86f3f45-8eea-40b3-98f7-b940357a4634)


- ¿Qué errores visuales, de jerarquía o de experiencia puedes identificar en la imagen?

    R: Mirando la interfaz del chat, puedo identificar varios problemas que afectan la experiencia del usuario:

    En cuanto a **jerarquía visual**, lo primero que me llama la atención es que el encabezado está muy apretado y no se distingue claramente la información importante. El código "VCS105 #20" y el botón "Ver" compiten por atención sin una jerarquía clara de qué es más importante.

    Los **avatares de usuarios** en la parte superior son demasiado pequeños y están muy juntos, lo que hace difícil identificar quién está trabajando actualmente. Además, no hay una indicación clara de su estado o rol.

    En el área de **mensajes**, hay varios problemas:
    - Las burbujas de chat no tienen suficiente contraste ni separación visual
    - Los timestamps están en diferentes formatos y posiciones, lo que genera confusión
    - No hay una diferenciación clara entre mensajes del sistema (notificaciones) y conversaciones entre técnicos
    - Los nombres de usuario se repiten innecesariamente y ocupan espacio valioso

    La **barra inferior** con los botones de acción también presenta problemas: los iconos son poco descriptivos y no hay labels que indiquen su función claramente.

- ¿Qué funcionalidades o mejoras implementarías?

    R: Para mejorar esta interfaz, implementaría las siguientes funcionalidades y mejoras:

    **Mejoras de diseño:**
    - Rediseñaría el header con mejor jerarquía: código de orden más prominente, botón "Ver" con más contraste
    - Ampliaría y mejoraría los avatares de usuarios activos, agregando indicadores de estado (disponible, ocupado, etc.)
    - Implementaría un sistema de colores más consistente para diferenciar tipos de mensajes
    - Mejoraría el espaciado y la tipografía para mejor legibilidad

    **Funcionalidades nuevas:**
    - Agregaría un sistema de **notificaciones push** para mensajes importantes
    - Implementaría **indicadores de mensaje leído/no leído**
    - Incluiría **filtros de mensajes** (solo notificaciones, solo conversaciones, etc.)
    - Agregaría **búsqueda dentro del chat**
    - Implementaría **respuestas rápidas** o plantillas para mensajes comunes

    **Mejoras de UX:**
    - Añadiría **confirmaciones visuales** cuando se envían mensajes
    - Implementaría **scroll automático** a nuevos mensajes
    - Agregaría **timestamps más claros** y consistentes
    - Incluiría la opción de **adjuntar archivos** de manera más intuitiva
    - Mejoraría la **navegación** entre diferentes órdenes de trabajo

    **Accesibilidad:**
    - Aumentaría el contraste de colores
    - Agregaría soporte para lectores de pantalla
    - Implementaría navegación por teclado
    - Añadiría opciones de tamaño de fuente

    Estas mejoras harían que la interfaz sea más intuitiva, eficiente y accesible para los técnicos que la usan diariamente.

## 🚗 Control Car App
Esta aplicación ha sido desarrollada como respuesta al test práctico frontend, implementando las mejoras propuestas para el flujo de creación de presupuestos y análisis de la experiencia de usuario.

### Estructura del Proyecto
- **Dashboard**: Panel principal de la aplicación
- **Quotes**: Módulo de cotizaciones con funcionalidad de creación
- **Products**: Gestión de productos
- **Appointments**: Sistema de citas
- **Shared**: Componentes e interfaces compartidas

### Instalación
```bash
npm install
ng serve
```

### Tecnologías Utilizadas
- Angular 20
- SCSS
- TypeScript
- Responsive Design
