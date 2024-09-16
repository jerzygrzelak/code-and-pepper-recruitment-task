import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatCard, MatCardContent} from "@angular/material/card";
import {ScoreCounterComponent} from "./components/score-counter/score-counter.component";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCard,
    MatCardContent,
    ScoreCounterComponent,
    MatIcon,
    MatIconModule,
    MatFabButton,
    MatButton,
    MatRadioGroup,
    MatRadioButton,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'code-and-pepper-recruitment-task';
}
