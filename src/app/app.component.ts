import { Component, ViewChild } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

const ZOOM_STEP: number = 0.1;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;

  title = "ng2-Pdf-viewer component";

  MIN_ZOOM: number = 0.21; // 20%
  MAX_ZOOM: number = 4.99; //500%

  //// showAllPages: boolean = true; ////[(page)]="page"
  //// page: number = 1;
  //// totalPages: number;
  zoom: number = 2.0;
  zoomPercent: string;

  searchText: string = "";

  isLoaded: boolean = false;

  afterLoadComplete(pdfData: any) {
    //// this.totalPages = pdfData.numPages;
    this.zoom = 2.0;
    this.updateZoomLabel();
    this.isLoaded = true;
  }

  //// nextPage() {
  ////   this.page++;
  //// }

  ////  prevPage() {
  ////   this.page--;
  //// }

  runPdfCommand(cmd: string)
  {
    this.pdfComponent.pdfFindController.executeCommand(cmd, {
      caseSensitive: false,
      findPrevious: undefined,
      highlightAll: true,
      phraseSearch: true,
      query: this.searchText
    });
  }

  runSearch() {
    this.runPdfCommand("find");
  }

  searchNext() {
    this.runPdfCommand("findagain");
    this.pdfComponent.pdfViewer.scrollPageIntoView( {pageNumber: 5} ); ////
    this.pdfComponent.pdfViewer
  }

  updateZoomLabel() {
    this.zoomPercent = Math.round( 100 * this.zoom) + " % ";
  }

  zoomIn() {
    if (this.zoom < this.MAX_ZOOM) {
      this.zoom += ZOOM_STEP ;
      this.updateZoomLabel();
    }
  }

  zoomOut() {
    if (this.zoom > this.MIN_ZOOM) {
      this.zoom -= ZOOM_STEP ;
      this.updateZoomLabel();
    }
  }
}
