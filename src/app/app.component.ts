import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import axios from 'axios';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  jobs: any[] = [];
  jobsCopy: any[] = [];
  searchInput = "";
  lowValue: number = 0;
  highValue: number = 5;
  async ngOnInit() {
    axios.get("https://api.crossref.org/works?filter=has-full-text:true&mailto=andrejjj222@gmail.com").then((response) => {
      this.jobs = Object.values(response.data.message.items)
      this.jobsCopy = this.jobs
    })
  }
  search(): void {
    const jobs: any[] = [];
    this.jobsCopy.forEach((job) => {
      if (job.title[0].toLowerCase().startsWith(this.searchInput)) {
        jobs.push(job);
      }
    })
    this.jobs = jobs;
  }
  // used to build a slice of papers relevant at any given time
  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
}
