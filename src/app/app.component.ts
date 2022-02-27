import { Component } from '@angular/core';
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
  async ngOnInit() {
    axios.get("https://api.crossref.org/works?filter=has-full-text:true&mailto=andrejjj222@gmail.com").then((response) => {
      this.jobs = Object.values(response.data.message.items)
      this.jobsCopy = this.jobs
      console.log(this.jobs)
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
}
