import { Component } from '@angular/core';


interface SectionItem {
  iconPath: string,
  name: string,
  relativePath: string
}

@Component({
  selector: 'app-dashboard-sections',
  templateUrl: './dashboard-sections.component.html',
  styleUrl: './dashboard-sections.component.css'
})
export class DashboardSectionsComponent {
  sections: SectionItem[] = [
    {iconPath: "../../../assets/icons/batchs.png", name: "Lotes", relativePath: "batchs"},
    {iconPath: "../../../assets/icons/origins.png", name: "Orígenes", relativePath: "origins"},
    {iconPath: "../../../assets/icons/logs.png", name: "Logs", relativePath: "logs"},
    {iconPath: "../../../assets/icons/users.png", name: "Usuarios", relativePath: "users"}
  ];
  selectedSection = "Logs";


  onSectionClick(event: Event, sectionName: string ) {
    this.selectedSection = sectionName;
    event.preventDefault();
  }
}
