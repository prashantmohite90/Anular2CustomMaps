import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { first } from 'rxjs/operator/first';

@Injectable()
export class MapService {
    api$: ReplaySubject<any> = first.call(new ReplaySubject(1));
    apiUrl: string = 'https://maps.google.com/maps/api/js?key=AIzaSyCbMGRUwcqKjlYX4h4-P6t-xcDryRYLmCM&libraries=visualization,places,drawing';
    defaultLat: number = -34.397;
    defaultLng: number = 150.644;
    defaultZoomLevel: number = 8;

    intializeMap(map: google.maps.Map, center: any, zoom: number): google.maps.Map {
        map = new google.maps.Map(document.getElementById('se-google-map'), {
            center: {
                lat: center && center.lat ? center.lat : this.defaultLat,
                lng: center && center.lng ? center.lng : this.defaultLng
            },
            zoom: zoom ? zoom : this.defaultZoomLevel
        });
        return map;
    }

    loadGoogleMapAPI() {
        let script = document.createElement('script');
        script.id = 'se-map-api';

        script.async = true;
        script.onload = () => this.api$.next(google.maps);
        script.src = this.apiUrl;
        document.querySelector('body').appendChild(script);
    }
}