import { Component, OnInit } from '@angular/core';
import {Sortable, Plugins} from '@shopify/draggable';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  constructor() { }
  
  ngOnInit() {
    this.MultipleContainers();
  }
  

  Classes = {
    draggable: 'StackedListItem--isDraggable',
    capacity: 'draggable-container-parent--capacity',
  };

MultipleContainers() {
  const containers = document.querySelectorAll('#MultipleContainers .StackedList');

  if (containers.length === 0) {
    return false;
  }

  const sortable = new Sortable(containers, {
    draggable: `.${this.Classes.draggable}`,
    mirror: {
      constrainDimensions: true,
    },
    plugins: [Plugins.ResizeMirror],
  });
  
  console.log(sortable)
  const containerTwoCapacity = 3;
  const containerTwoParent = sortable.containers[0].parentNode;
  let currentMediumChildren;
  let capacityReached;
  let lastOverContainer;

  // --- Draggable events --- //
  sortable.on('drag:start', (evt) => {
    console.log(evt)
    currentMediumChildren = sortable.getDraggableElementsForContainer(sortable.containers[1]).length;
    capacityReached = currentMediumChildren === containerTwoCapacity;
    lastOverContainer = evt.sourceContainer;
    containerTwoParent.classList.toggle(this.Classes.capacity, capacityReached);
  });

  sortable.on('sortable:sort', (evt) => {
    if (!capacityReached) {
      return;
    }

    const sourceIsCapacityContainer = evt.dragEvent.sourceContainer === sortable.containers[1];

    if (!sourceIsCapacityContainer && evt.dragEvent.overContainer === sortable.containers[1]) {
      evt.cancel();
    }
  });

  sortable.on('sortable:sorted', (evt) => {
    if (lastOverContainer === evt.dragEvent.overContainer) {
      return;
    }

    lastOverContainer = evt.dragEvent.overContainer;
  });

  return sortable;
}





}
