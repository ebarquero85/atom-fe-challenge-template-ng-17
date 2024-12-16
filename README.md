# ATOM FE CHALLENGE TEMPLATE - ANGULAR

## Comentarios sobre el desarrollo

En el Frontend:

- Se decidió utilizar componentes standalone, ya que es la recomendación para simplificar la arquitectura al evitar depender excesivamente de módulos. Además, es una aplicación pequeña, por lo que se evitó importar los módulos de Material en un módulo principal.
- El frontend se publicó en las Pages de Cloudflare.
- Se utilizó Angular Material para los formularios y algunos diseños. Pensé en utilizar Tailwind CSS, pero al final consideré que no lo requería.
- Las tareas están ordenadas de las más reciente a la más antigua (descendiente) y las que están completadas pasan siempre al final de la lista.

En el Backend:

- Debido a que es un ambiente de desarrollo, no se utilizaron reglas o restricciones en Firestore Database.
- Los CORS permiten el llamado desde cualquier URL por si se desea validar algunos endpoints desde Postman, etc.
- Se utilizó Express y TypeScript, y fue hosteado en Firebase Functions.
- Las tareas eliminadas pasan a un estado deleted = true ya que siempre los borrados deben de ser lógicos y no definitivos.

---

### Edgard Barquero
