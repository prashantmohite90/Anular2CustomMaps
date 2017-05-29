"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var se_map_service_1 = require('./services/se-map.service');
var se_drawingManager_service_1 = require('./services/se-drawingManager.service');
var cordinates_type_1 = require('./cordinates.type');
//import './google-map-api.js';
var SeMapComponent = (function () {
    function SeMapComponent(mapService, drawingManagerService) {
        this.mapService = mapService;
        this.drawingManagerService = drawingManagerService;
        this.mapReady$ = new core_1.EventEmitter();
        this.mapOptions = {};
        // map has been fully initialized
        this.mapIdledOnce = false;
        this.initializeMapAfterDisplayed = false;
        this.mapService.loadGoogleMapAPI();
    }
    SeMapComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.mapService.api$.subscribe(function () {
            _this.drawingmanager = new google.maps.drawing.DrawingManager();
            _this.initializeMap();
            _this.registerEventListener();
        });
    };
    SeMapComponent.prototype.registerEventListener = function () {
        var _this = this;
        google.maps.event.addListener(_this.drawingmanager, 'overlaycomplete', function (event) {
            if (event.type !== google.maps.drawing.OverlayType.MARKER) {
                _this.drawingmanager.setDrawingMode(null);
                _this.selectedOverlay = event.overlay;
                _this.removeDrawingTools();
            }
        });
    };
    SeMapComponent.prototype.removeDrawingTools = function () {
        this.drawingManagerService.removeDrawingTools(this.drawingmanager, this.map);
    };
    SeMapComponent.prototype.addDrawingTools = function () {
        this.drawingManagerService.addDrawingTools(this.drawingmanager, this.map, this.drawingMode, this.drawingControl, this.drawingControlPosition, this.allowedDrawingShapes);
    };
    SeMapComponent.prototype.initializeMap = function () {
        this.map = this.mapService.intializeMap(this.map, this.center, this.zoom);
        this.addDrawingTools();
    };
    SeMapComponent.prototype.deleteSelectedOverlay = function () {
        if (this.selectedOverlay) {
            this.selectedOverlay.setMap(null);
            delete this.selectedOverlay;
            this.addDrawingTools();
        }
    };
    SeMapComponent.prototype.redrawPolygon = function () {
        var regionMapMarkers;
        regionMapMarkers = [];
        for (var i = 0; i < this.polyChords.length; i++) {
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
    };
    SeMapComponent.prototype.getPolygonCordinates = function () {
        if (this.selectedOverlay) {
            this.contentString = '';
            var vertices = this.selectedOverlay.getPath();
            this.polyChords = [];
            for (var i = 0; i < vertices.getLength(); i++) {
                var xy = vertices.getAt(i);
                var cord = new cordinates_type_1.Cordinates();
                cord.lat = xy.lat();
                cord.lng = xy.lng();
                this.polyChords.push(cord);
                this.contentString += '\n' + 'Coordinate ' + i + ':\n' + xy.lat() + ',' +
                    xy.lng();
            }
        }
    };
    SeMapComponent.prototype.ngOnDestroy = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeMapComponent.prototype, "center", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeMapComponent.prototype, "zoom", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SeMapComponent.prototype, "drawingControl", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SeMapComponent.prototype, "drawingMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SeMapComponent.prototype, "drawingControlPosition", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SeMapComponent.prototype, "allowedDrawingShapes", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SeMapComponent.prototype, "mapReady$", void 0);
    SeMapComponent = __decorate([
        core_1.Component({
            selector: 'se-map',
            encapsulation: core_1.ViewEncapsulation.None,
            styleUrls: ['app/se-map.css'],
            templateUrl: 'app/se-map.component.html',
            providers: [se_map_service_1.MapService, se_drawingManager_service_1.DrawingManagerService]
        }), 
        __metadata('design:paramtypes', [se_map_service_1.MapService, se_drawingManager_service_1.DrawingManagerService])
    ], SeMapComponent);
    return SeMapComponent;
}());
exports.SeMapComponent = SeMapComponent;
//# sourceMappingURL=se-map.component.js.map