import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const { pathname } = useLocation();
  const pathArray = pathname.split("/").slice(2);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {/* <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{pathname.split("/").slice(1).length}</BreadcrumbPage>
                </BreadcrumbItem> */}
                {/* {pathname
                  .split("/")
                  .slice(1)
                  .map((segment, index) => (
                    <BreadcrumbItem key={index} className="hidden md:block">
                      <Link to={`/${segment}`}>
                        <BreadcrumbLink>{segment}</BreadcrumbLink>
                      </Link>
                    </BreadcrumbItem>
                  ))} */}
                {/* {pathname.split("/").slice(1).length <= 2 ? (
                  <BreadcrumbItem>
                    <Link to={`/${pathname.split("/").slice(1).join("/")}`}>
                      <BreadcrumbLink className="hidden md:block">{pathname.split("/").slice(1)}</BreadcrumbLink>
                    </Link>
                  </BreadcrumbItem>
                ) : null} */}
                {pathArray.length <= 1 ? (
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbPage>{pathArray[0]}</BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  pathArray.slice(0, -1).map((segment, index) => (
                    <>
                      <BreadcrumbItem className="hidden md:block" key={index}>
                        <Link to={`/d/${segment}`}>
                          <BreadcrumbLink>{segment}</BreadcrumbLink>
                        </Link>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                    </>
                  ))
                )}
                {pathArray.length > 1 && (
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbPage>{pathArray.pop()}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main>
          <div className="flex items-center gap-2 justify-center">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
