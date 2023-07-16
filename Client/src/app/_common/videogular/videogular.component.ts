import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieModel } from '../../_models/movieModel';
import { MovieService } from '../../_services/movie.service';
import { VgAPI } from 'ngx-videogular';

@Component({
  selector: 'app-videogular',
  templateUrl: './videogular.component.html',
  styleUrls: ['./videogular.component.css']
})
export class VideogularComponent implements OnInit {
  @Input() videoPath: string;

  movie: MovieModel = {} as MovieModel;
  userId: number;
  api: any;
  videos: {};

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit(): void {

    this.videos = [{
      sources: 
        {src: this.videoPath, type: "video/mp4"}
    }];
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.playVideo();
  }

  playVideo() {
      this.api.play();
  }
}
