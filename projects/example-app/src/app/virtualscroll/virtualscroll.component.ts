import { Component, Input } from '@angular/core';
import { TreeNode, TreeModel, ITreeOptions } from 'angular-tree-component';
import { Observable } from 'rxjs';

@Component({
  selector: 'test',
  styles: [],
  template: `<div style="background: red; height: 50px; width: 50px"></div>`
})
export class TestComponent {
  ngOnInit() {
    console.log("Init component");
  }
}

@Component({
  selector: 'app-virtualscroll',
  styles: [
  ],
  template: `
  <div style="height: 800px; width: 500px; overflow: hidden;">

    <tree-root
      #tree
      [nodes]="nodes"
      [options]="options"
      [focused]="true"
    >
    <ng-template #treeNodeTemplate>
        <test></test>
    </ng-template>
    </tree-root>
  </div>
  `
})
export class VirtualscrollComponent {
  nodes: any[];

  options: ITreeOptions = {
    nodeHeight: () => 50,
    useVirtualScroll: true,
    getChildren: () => {
      return new Observable(o => { o.next(new Array(1000).fill(null).map((item, i) => ({
        id: `${i}.${i}`,
        name: `rootChildDynamic${i}.${i}`
      }))); return o.complete(); }).toPromise();
    }
  };

  constructor() {
    this.nodes = new Array(50).fill(null).map((item, i) => ({
      id: `${i}`,
      name: `rootDynamic${i}`
    }));

    this.nodes[0].hasChildren = true;
  }
}
