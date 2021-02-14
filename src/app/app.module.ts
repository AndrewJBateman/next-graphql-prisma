// Core imports
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// Components and modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PipesModule } from './pipes/pipes.module';

// Third party imports
import { Network } from "@ionic-native/network/ngx";
// import { SplashScreen } from "@ionic-native/splash-screen/ngx";
// import { StatusBar } from "@ionic-native/status-bar/ngx";
import { IonicStorageModule } from "@ionic/storage";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient],
			},
		}),
    PipesModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
