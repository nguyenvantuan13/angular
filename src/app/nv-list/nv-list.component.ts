import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { INhanVien } from '../inhan-vien';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nv-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nv-list.component.html',
  styleUrls: ['./nv-list.component.css']
})
export class NvListComponent {
  list_nhan_vien: INhanVien[] = [];
  searchKeyword: string = ''; // Biến lưu từ khóa tìm kiếm
  filtered_nhan_vien: INhanVien[] = [];

  constructor(private router: Router) {} // Inject Router

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    fetch(`http://localhost:3000/nhan_vien`)
      .then(res => res.json())
      .then(data => {
        this.list_nhan_vien = data;
        this.filtered_nhan_vien = data; // Ban đầu hiển thị toàn bộ nhân viên
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }

  xoaNhanVien(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      fetch(`http://localhost:3000/nhan_vien/${id}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(() => {
          alert('Xóa nhân viên thành công');
          this.fetchEmployees(); // Refresh the employee list after deletion
        })
        .catch(error => {
          console.error('Error deleting employee:', error);
        });
    }
  }

  suaNhanVien(id: number): void {
    this.router.navigate(['/nhan_vien/sua', id]); // Navigate to the edit employee page
  }

  timKiem(): void {
    if (this.searchKeyword.trim() === '') {
      this.filtered_nhan_vien = this.list_nhan_vien; // Hiển thị tất cả nếu từ khóa rỗng
    } else  {
      this.filtered_nhan_vien = this.list_nhan_vien.filter(nhanVien =>
        nhanVien.ten.toLowerCase().includes(this.searchKeyword.toLowerCase()) || nhanVien.ho.toLowerCase().includes(this.searchKeyword.toLowerCase()) 
      );
    }    
  }
}
