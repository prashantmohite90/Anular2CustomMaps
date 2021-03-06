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
var ReplaySubject_1 = require('rxjs/ReplaySubject');
var first_1 = require('rxjs/operator/first');
var MapService = (function () {
    function MapService() {
        this.api$ = first_1.first.call(new ReplaySubject_1.ReplaySubject(1));
        this.apiUrl = 'https://maps.google.com/maps/api/js?key=AIzaSyCbMGRUwcqKjlYX4h4-P6t-xcDryRYLmCM&libraries=visualization,places,drawing';
        this.defaultLat = -34.397;
        this.defaultLng = 150.644;
        this.defaultZoomLevel = 8;
    }
    MapService.prototype.intializeMap = function (map, center, zoom) {
        map = new google.maps.Map(document.getElementById('se-google-map'), {
            center: {
                lat: center && center.lat ? center.lat : this.defaultLat,
                lng: center && center.lng ? center.lng : this.defaultLng
            },
            zoom: zoom ? zoom : this.defaultZoomLevel
        });
        return map;
    };
    MapService.prototype.loadGoogleMapAPI = function () {
        var _this = this;
        var script = document.createElement('script');
        script.id = 'se-map-api';
        script.async = true;
        script.onload = function () { return _this.api$.next(google.maps); };
        script.src = this.apiUrl;
        document.querySelector('body').appendChild(script);
    };
    MapService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MapService);
    return MapService;
}());
exports.MapService = MapService;
//# sourceMappingURL=se-map.service.js.map