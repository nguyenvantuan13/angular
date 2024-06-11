import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ITask } from '../itask';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
// lấy dữ liệu từ back end để hiện lên trang danh sách task
export class TaskListComponent {
  list_task:ITask[] = [];
    ngOnInit() : void {
      fetch (`http://localhost:3000/task`)
      .then(res => res.json())
      .then (data => {
        this.list_task = data as ITask[];
      })
    }
}
