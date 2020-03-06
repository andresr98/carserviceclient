# CarServiceClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# Documentación

## Módulos

### app-routing

Se mofica el archivo `app-routing.module` para dar rutas a los componentes `owner-list` y `owner-edit`. Con el componente `owner-edit`, se generan dos rutas, una para cuando se desea crear un nuevo Owner y la segunda cuando se desea editar uno existente.

## App Module
Se modifica el archivo `app.module.ts` con la adción de módulos extra de _Angular/material_ para desarrollar los requisitos de la aplicación. Los módulos adicionados son:

1. MatSelectModule
2. MatCheckboxModule

## Componentes

### App component

Lo primero que se realizó es cambiar el archivo `app.component.html` para generar un navbar sencillo que redireccione a las acciones del propietario \(Owner Actions\) y a las acciones de los carros \(Car Actions\).

### Car edit component 

El primer archivo que se editó fue `car-edit.component.ts`, donde se realiza una inyección de los servicios de **Car** y **Owner**. Con el servicio **Owner** se trae una lista de todos los Owners existentes en la base de datos para que sea posible realizar la relación *owner-car*. El otro servicio es utilizado para realizar un CRUD de los carros.

Por consiguiente, se moficó el archivo `car-edit.component.html`, donde se cambia el formulario para que muestre y permita agregar un Owner al carro que se está editando. Se logra con el módulo MatSelect con el siguiente código html:

``` html
    <mat-select [(ngModel)]="car.ownerDni" name="ownerDni" #ownerDni>
        <mat-option>None</mat-option>
        <mat-option *ngFor="let owner of owners" value="{{owner.dni}}">{{owner.name}}</mat-option>
    </mat-select>
```

Finalmente, se modifica el archivo `car-edit.component.css` con algunas clases para dar una mejor apariencia al formulario.

### Car list component 

Se editó el archivo `car-list.component.ts` con la inyección del servcio **Owner** para traer la información del Owner en caso de que al menos un carro en la lista lo posea.

Por consiguiente, se moficó el archivo `car-list.component.html`. Aquí se cambió la forma de listar los carros, ahora un carro es una tarjeta completa dentro de una etiqueta `a` para que se pueda presionar en cualquier parte y redijira al componete de su edición. Se logra mostrar el Owner name con la línea html `<mat-card-subtitle> {{car.ownerName}}</mat-card-subtitle>`. Luego se dan estilos para una vista un poco mas agradable.

### Owner edit component 

Se crea el componente con el comando `ng generate component ownerEdit`.

Se modifica el archivo `owner-edit.component.ts` con el objetivo de obtener el id enviado por URL y realizar las 4 operaciones del CRUD para un Owner. Allí se inyecta el servicio **Owner**, para lograr hacer las operaciones y la eliminación de las relaciones con los carros. Además, si existe más de un Owner con el mismo dni, el componente tiene la capacidad de listarlos y modificarlos de forma independiente.

Después, se moficó el archivo `owner-edit.component.html`, creando un formulario sencillo con los campos requeridos para crear un Owner \(Name, Dni, Profession\). También posee 3 botones con acciones distintas \(Save, Delete y Canel\) según el gusto del usuario. Finalmente, se adicionan algunos estilos al modificar el archivo `owner-edit.component.css`.

### Owner list component 

Se crea el componente con el comando `ng generate component ownerList`.

Se modificó el archivo `owner-list.component.ts` para traer todos los Owners por medio del servicio inyectado **Owner**. Cuando se tienen listados, a cada Owner se le adicionan dos campos adicioanles, _checked_ y _visible_ que sirven respectivamente para detectar cuando un ha sido seleccionado para ser borrado de forma multuple y un valor que indica si es visible o no para el cliente. 

Para lograr eliminar multiples Owners, se usa el modulo `MatCheckboxModule`. Cuando un Owner es seleccionado o deseleccionado, se modifca un diccionario \(Map para Typescript\) que almacena el valor de la posición del Owner en el vector creado por el servicio, de modo que solo se borran los Owners seleccionados y no es necesario recorrer el vector validando si alguno ha sido seleccionado.

El archivo `owner-list.component.html` es modificado de modo que cada owner sea una tarjeta clickeable con un campo checkbox a su costado derecho. Se muestran los campos principales del owner. Por medio de expresiones en angular, se habilita el botón de multples eliminaciones de Owner si al menos un Checkbox ha sido seleccionado. `<button mat-fab color="warn"  class = "fab-button" *ngIf="indexOwners.size" (click)="deleteOwners()">Delete</button>`.

## Servicios

### Owner Service

Se crea un servicio con el comando `ng generate service /shared/owner` para utilizar en él los 4 métodos HTTP \(GET, POST, PUT Y DELETE\) de la API expuesta para el ejercicio. Además se genera un método adicional _removeRelation\(dni\)_ que permite borrar el ownner dni a todos los carros asociados al owner a eliminar.