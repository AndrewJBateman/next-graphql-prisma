import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

// pages
import { TabsPage } from "./tabs.page";
import { TabsPageRoutingModule } from "./tabs-routing.module";
import { CategoriesPageModule } from "../pages/categories/categories.module";
import { FavouritesPageModule } from "../pages/favourites/favourites.module";
import { NewsPageModule } from "../pages/news/news.module";
import { NewsDetailPageModule } from "../pages/news-detail/news-detail.module";
import { AboutPageModule } from "../pages/about/about.module";

// ngx node modules
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    AboutPageModule,
    CategoriesPageModule,
    CommonModule,
    FavouritesPageModule,
    FormsModule,
    IonicModule,
    NewsPageModule,
    NewsDetailPageModule,
    TabsPageRoutingModule,
    TranslateModule,
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {}
