import {
    Component,
    ElementRef,
    ViewEncapsulation,
    EventEmitter,
    SimpleChanges,
    Output,
    NgZone,
    Input,
    AfterViewInit, AfterViewChecked, OnChanges, OnDestroy, OnInit
} from '@angular/core';
import { MapService } from './services/se-map.service';
import { DrawingManagerService } from './services/se-drawingManager.service';
import { Cordinates } from './cordinates.type'

//import './google-map-api.js';

@Component({
    selector: 'se-map',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['app/se-map.css'],
    templateUrl: 'app/se-map.component.html',
    providers: [MapService, DrawingManagerService]
})
export class SeMapComponent implements AfterViewInit {
    @Input() center: any;
    @Input() zoom: any;
    @Input() drawingControl: boolean;
    @Input() drawingMode: string;
    @Input() drawingControlPosition: string;
    @Input() allowedDrawingShapes: string[];

    @Output() public mapReady$: EventEmitter<any> = new EventEmitter();
    public map: google.maps.Map;
    drawingmanager: google.maps.drawing.DrawingManager;
    contentString: string;
    selectedOverlay: any;
    polyChords: Cordinates[];


    public mapOptions: google.maps.MapOptions = {};
    // map has been fully initialized
    public mapIdledOnce: boolean = false;

    private initializeMapAfterDisplayed = false;

    constructor(private mapService: MapService,
        private drawingManagerService: DrawingManagerService) {
        this.mapService.loadGoogleMapAPI();
    }

    ngAfterViewInit() {
        this.mapService.api$.subscribe(() => {
            this.drawingmanager = new google.maps.drawing.DrawingManager();
            this.initializeMap();
            this.registerEventListener();
        });
    }

    registerEventListener() {
        var _this = this;
        google.maps.event.addListener(_this.drawingmanager, 'overlaycomplete', function (event: any) {
                if (event.type !== google.maps.drawing.OverlayType.MARKER) {
                    _this.drawingmanager.setDrawingMode(null);
                    _this.selectedOverlay = event.overlay;
                    _this.removeDrawingTools();
                }
            });
    }

    removeDrawingTools() {
        this.drawingManagerService.removeDrawingTools(this.drawingmanager, this.map);
    }

    addDrawingTools() {
        this.drawingManagerService.addDrawingTools(this.drawingmanager, this.map, this.drawingMode
            , this.drawingControl, this.drawingControlPosition, this.allowedDrawingShapes);
    }

    initializeMap(): void {
        this.map= this.mapService.intializeMap(this.map, this.center, this.zoom);
        this.addDrawingTools();
    }
    deleteSelectedOverlay (){
        if (this.selectedOverlay) {
            this.selectedOverlay.setMap(null);
            delete this.selectedOverlay;
            this.addDrawingTools();
        }
    }

    redrawPolygon() {
        var regionMapMarkers: any[];
        regionMapMarkers = [];
        
        for (let i = 0; i < this.polyChords.length; i++)
        {
            var c1 = new google.maps.LatLng(this.polyChords[i].lat, this.polyChords[i].lng);
            regionMapMarkers.push(c1);
        }

        var polygon = new google.maps.Polygon({
            paths: regionMapMarkers,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
        });
        polygon.setMap(this.map);
    }

    getPolygonCordinates() {
        if (this.selectedOverlay) {
            this.contentString = '';
            
            var vertices = this.selectedOverlay.getPath();
            this.polyChords = [];
            for (var i = 0; i < vertices.getLength(); i++) {
                var xy = vertices.getAt(i);
                var cord = new Cordinates();

                cord.lat = xy.lat();
                cord.lng = xy.lng();
               
                this.polyChords.push(cord);

                this.contentString += '\n' + 'Coordinate ' + i + ':\n' + xy.lat() + ',' +
                    xy.lng();
            }
        }
    }

    ngOnDestroy() {
        
    }
}