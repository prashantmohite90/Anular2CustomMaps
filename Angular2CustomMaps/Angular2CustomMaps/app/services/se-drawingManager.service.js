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
var DrawingManagerService = (function () {
    function DrawingManagerService() {
    }
    DrawingManagerService.prototype.addDrawingTools = function (drawingmanager, map, drawingMode, drawingControl, drawingControlPosition, allowedDrawingShapes) {
        drawingmanager.setOptions({
            drawingMode: this.getDrawingMode(drawingMode),
            drawingControl: this.getDrawingControlVal(drawingControl),
            drawingControlOptions: {
                position: this.getDrawingControlPosition(drawingControlPosition),
                drawingModes: this.getAllowedDrawingShapes(allowedDrawingShapes)
            }
        });
        drawingmanager.setMap(map);
    };
    DrawingManagerService.prototype.removeDrawingTools = function (drawingmanager, map) {
        drawingmanager.setOptions({
            drawingControl: false
        });
        drawingmanager.setMap(map);
    };
    DrawingManagerService.prototype.getDrawingMode = function (drawingMode) {
        if (drawingMode && drawingMode !== '') {
            var mode = drawingMode.toLowerCase();
            switch (mode) {
                case google.maps.drawing.OverlayType.CIRCLE.toString():
                    return google.maps.drawing.OverlayType.CIRCLE;
                case google.maps.drawing.OverlayType.MARKER.toString():
                    return google.maps.drawing.OverlayType.MARKER;
                case google.maps.drawing.OverlayType.POLYGON.toString():
                    return google.maps.drawing.OverlayType.POLYGON;
                case google.maps.drawing.OverlayType.POLYLINE.toString():
                    return google.maps.drawing.OverlayType.POLYLINE;
                default: return google.maps.drawing.OverlayType.MARKER;
            }
        }
        else {
            return google.maps.drawing.OverlayType.MARKER;
        }
    };
    DrawingManagerService.prototype.getDrawingControlVal = function (drawingControl) {
        if (drawingControl === undefined || drawingControl === null)
            return false;
        return drawingControl;
    };
    DrawingManagerService.prototype.getDrawingControlPosition = function (controlPosition) {
        if (controlPosition && controlPosition !== '') {
            var position = controlPosition.toLowerCase();
            switch (position) {
                case google.maps.ControlPosition.BOTTOM_CENTER.toString():
                    return google.maps.ControlPosition.BOTTOM_CENTER;
                case google.maps.ControlPosition.BOTTOM_LEFT.toString():
                    return google.maps.ControlPosition.BOTTOM_LEFT;
                case google.maps.ControlPosition.BOTTOM_RIGHT.toString():
                    return google.maps.ControlPosition.BOTTOM_RIGHT;
                case google.maps.ControlPosition.LEFT_BOTTOM.toString():
                    return google.maps.ControlPosition.LEFT_BOTTOM;
                case google.maps.ControlPosition.LEFT_CENTER.toString():
                    return google.maps.ControlPosition.LEFT_CENTER;
                case google.maps.ControlPosition.LEFT_TOP.toString():
                    return google.maps.ControlPosition.LEFT_TOP;
                case google.maps.ControlPosition.RIGHT_BOTTOM.toString():
                    return google.maps.ControlPosition.RIGHT_BOTTOM;
                case google.maps.ControlPosition.RIGHT_CENTER.toString():
                    return google.maps.ControlPosition.RIGHT_CENTER;
                case google.maps.ControlPosition.RIGHT_TOP.toString():
                    return google.maps.ControlPosition.RIGHT_TOP;
                case google.maps.ControlPosition.TOP_CENTER.toString():
                    return google.maps.ControlPosition.TOP_CENTER;
                case google.maps.ControlPosition.TOP_LEFT.toString():
                    return google.maps.ControlPosition.TOP_LEFT;
                case google.maps.ControlPosition.TOP_RIGHT.toString():
                    return google.maps.ControlPosition.TOP_RIGHT;
                default: return google.maps.ControlPosition.BOTTOM_CENTER;
            }
        }
        else {
            return google.maps.ControlPosition.TOP_CENTER;
        }
    };
    DrawingManagerService.prototype.getAllowedDrawingShapes = function (shapeList) {
        var allowedShapes = [];
        if (shapeList && shapeList.length !== 0) {
            for (var i = 0; i < shapeList.length; i++) {
                var shape = shapeList[i].toString().toLowerCase();
                switch (shape) {
                    case google.maps.drawing.OverlayType.CIRCLE.toString():
                        allowedShapes.push(google.maps.drawing.OverlayType.CIRCLE);
                        break;
                    case google.maps.drawing.OverlayType.MARKER.toString():
                        allowedShapes.push(google.maps.drawing.OverlayType.MARKER);
                        break;
                    case google.maps.drawing.OverlayType.POLYGON.toString():
                        allowedShapes.push(google.maps.drawing.OverlayType.POLYGON);
                        break;
                    case google.maps.drawing.OverlayType.POLYLINE.toString():
                        allowedShapes.push(google.maps.drawing.OverlayType.POLYGON);
                        break;
                }
            }
        }
        else {
            allowedShapes.push(google.maps.drawing.OverlayType.MARKER);
        }
        return allowedShapes;
    };
    DrawingManagerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DrawingManagerService);
    return DrawingManagerService;
}());
exports.DrawingManagerService = DrawingManagerService;
//# sourceMappingURL=se-drawingManager.service.js.map