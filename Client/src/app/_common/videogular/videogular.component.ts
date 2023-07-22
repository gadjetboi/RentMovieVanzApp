import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieModel } from '../../_models/movieModel';
import { MovieService } from '../../_services/movie.service';
import { VgAPI } from 'ngx-videogular';
import { Output, EventEmitter } from '@angular/core';

declare var window:any;

@Component({
  selector: 'app-videogular',
  templateUrl: './videogular.component.html',
  styleUrls: ['./videogular.component.css']
})
export class VideogularComponent implements OnInit {
  @Input() movieData: any;
  @Output() isStopVideo = new EventEmitter<boolean>();

  movie: MovieModel = {} as MovieModel;
  userId: number;
  api: any;
  videos: {};
  formModal: any;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit(): void {

    this.formModal = new window.bootstrap.Modal(
      document.getElementById("myModal")
    );

    this.videos = [{
      sources: 
        {src: this.movieData.trailerPath, type: "video/mp4"}
    }];
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.playVideo();
  }

  playVideo() {
    this.formModal.show();
    this.api.play();
    this.isStopVideo.emit(false);
  }

  stopVideo() {
    this.api.pause();
    this.isStopVideo.emit(true);
  }
}
