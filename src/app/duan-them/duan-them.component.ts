import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DulieuService } from '../dulieu.service';
import { INhanVien } from '../inhan-vien';
import { IDuAn } from '../idu-an';

@Component({
  selector: 'app-duan-them',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './duan-them.component.html',
  styleUrl: './duan-them.component.css'
})
export class DuanThemComponent {
  listNhanVien:INhanVien[] = [];
  constructor(private d:DulieuService) {}
  ngOnInit():void{
    this.d.layNhanVien().subscribe (data =>{
      this.listNhanVien = data as  INhanVien[];
    });
  }
  xuly(da:IDuAn){
    this.d.themDuAn(da).subscribe (data =>{
      console.log(da, data);
      alert('Thêm thành công');
      // chuyển đến danh sách dự án
    });
  }
}
