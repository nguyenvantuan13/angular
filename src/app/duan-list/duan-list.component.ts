import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router'; // Import Router
import { IDuAn } from '../idu-an';

@Component({
  selector: 'app-duan-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // Thêm FormsModule
  templateUrl: './duan-list.component.html',
  styleUrls: ['./duan-list.component.css'] // Sửa từ styleUrl thành styleUrls
})
export class DuanListComponent {
  list_du_an: IDuAn[] = [];
  searchKeyword: string = ''; // Biến lưu từ khóa tìm kiếm
  filtered_du_an: IDuAn[] = [];

  constructor(private router: Router) {} // Inject Router

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    fetch(`http://localhost:3000/du_an`)
      .then(res => res.json())
      .then(data => {
        this.list_du_an = data;
        this.filtered_du_an = data; // Ban đầu hiển thị toàn bộ dự án
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }

  xoaDuAn(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
      fetch(`http://localhost:3000/du_an/${id}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(() => {
        alert('Xóa dự án thành công');
        this.fetchProjects(); // Refresh the project list after deletion
      })
      .catch(error => {
        console.error('Error deleting project:', error);
      });
    }
  }
//  Sửa
  suaDuAn(id: number): void {
    this.router.navigate(['/du_an/sua', id]); // Navigate to the edit project page
  }
// Tìm kiếm
  timKiem(): void {
    if (this.searchKeyword.trim() === '') {
      this.filtered_du_an = this.list_du_an; // Hiển thị tất cả nếu từ khóa rỗng
    } else {
      this.filtered_du_an = this.list_du_an.filter(duAn =>
        duAn.ten_du_an.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }
  }
}
