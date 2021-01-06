import {Component, HostListener, OnInit} from '@angular/core';
import {IpcService} from '../../utils/ipc.service';
import {TreeService} from '../layer-stack/mat-tree/tree.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-heder-menu',
  templateUrl: './heder-menu.component.html',
  styleUrls: ['./heder-menu.component.less']
})
export class HederMenuComponent implements OnInit {

  loading = false;

  constructor(private ipc: IpcService,
              private treeService: TreeService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.ipc.on('openFile', (event: Electron.IpcMessageEvent, message) => {
      this.toastr.success('Project loaded');
      this.treeService.itemList = JSON.parse(message);
      console.log(message);
    });
    this.ipc.on('saveFile', (event: Electron.IpcMessageEvent) => {
      this.toastr.success('Project saved');
      this.loading = false;
    });
    this.ipc.on('saveFileAs', (event: Electron.IpcMessageEvent) => {
      this.toastr.success('Project saved');
      this.loading = false;
    });
  }

  @HostListener('window:keydown', ['$event'])
  saveKey(e: KeyboardEvent): void {
    if (e.key === 's' && e.ctrlKey) {
      this.saveProjectAs();
    }
  }

  newProject(): void {
    this.ipc.send('new', '');
  }

  openProject(): void {
    this.ipc.send('openFile', '');
  }

  saveProjectAs(): void {
    this.loading = true;
    this.ipc.send('saveFileAs', JSON.stringify(this.treeService.itemList));
  }

  saveProject(): void {
    this.loading = true;
    this.ipc.send('saveFile', JSON.stringify(this.treeService.itemList));
  }


}
