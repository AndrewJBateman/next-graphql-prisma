import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "news",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../pages/news/news.module").then((m) => m.NewsPageModule),
          },
        ],
      },
      {
        path: "news-detail",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../pages/news-detail/news-detail.module").then(
                (m) => m.NewsDetailPageModule
              ),
          },
        ],
      },
      {
        path: "categories",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../pages/categories/categories.module").then(
                (m) => m.CategoriesPageModule
              ),
          },
        ],
      },
      {
        path: "favourites",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../pages/favourites/favourites.module").then(
                (m) => m.FavouritesPageModule
              ),
          },
        ],
      },
      {
        path: "about",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../pages/about/about.module").then(
                (m) => m.AboutPageModule
              ),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/tabs/news",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/app/tabs/news",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
