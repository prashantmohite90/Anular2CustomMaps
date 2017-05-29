import { Component } from '@angular/core';
import { SeMapComponent } from './se-map.component'
@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    moduleId: module.id
})
export class AppComponent {
    name = 'Google Map Drawing Manager';
    zoomLevel: number = 8;
    MapCenter: any = { lat: -34.397, lng: 150.644 };
    drawingControl: boolean = true;
    drawingMode = 'POLYGON';
    drawingControlPosition = 'TOP_CENTER';
    allowedDrawingShapes = ['POLYGON'];
}
