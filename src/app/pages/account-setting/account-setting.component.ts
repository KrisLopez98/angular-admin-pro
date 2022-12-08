import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: [
  ]
})
export class AccountSettingComponent implements OnInit {


  constructor(private settingService: SettingsService) { }

  ngOnInit(): void {
    this.settingService.checkCurrentTheme();
  }

  changeColor(color: string): void {
    this.settingService.changeColor(color);
  }


}
