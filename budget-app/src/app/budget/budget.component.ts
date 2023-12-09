// budget.component.ts
import { Component, Input, OnInit, TemplateRef, inject } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
})
export class BudgetComponent implements OnInit {
  public actionType = 'Add';
  budgetItems: any[] = [];
  showAddBudgetModal: boolean = false;
  newBudget: any = { title: '', amount: null };
  modalRef: any;
  constructor(private budgetService: BudgetService) {}
  ngOnInit(): void {
    this.getBudgetItems();
  }

  addBudgetItem() {
    const newItem = {
      title: this.newBudget.title,
      amount: this.newBudget.amount,
    };
    console.log(newItem);

    this.budgetService.addBudgetItem(newItem).subscribe(
      (response) => {
        this.budgetItems.push(newItem);

        console.log('Item added successfully:', response);
        swal.fire('Success!', response.message, 'success');
        this.modalRef.close();
        this.newBudget = { title: '', amount: null };
      },
      (error) => {
        console.error('Failed to add item:', error);
      }
    );
  }
  editBudgetItem(item: any) {

    this.budgetService.updateBudgetItem(item).subscribe(
      (response) => {
        console.log('Item updated successfully:', response);
        swal.fire('Success!', response.message, 'success');
        this.getBudgetItems();
        this.modalRef.close();
        this.newBudget = { title: '', amount: null };
      },
      (error) => {
        console.error('Failed to update item:', error);
      }
    );
  }

  deleteBudgetItem(item: any) {
    this.budgetService.deleteBudgetItem(item).subscribe(
      (response) => {
        // Handle successful deletion, e.g., refresh the list
        this.budgetItems = this.budgetItems.filter((i) => i !== item);
        console.log('Item deleted successfully:', response);
        swal.fire('Success!', response.message, 'success');
      },
      (error) => {
        // Handle deletion error, display an error message, etc.
        console.error('Failed to delete item:', error);
      }
    );
  }
  getBudgetItems() {
    this.budgetService.getBudgetItems().subscribe(
      (response) => {
        // Handle successful get, e.g., refresh the list
        this.budgetItems = response.data;
        console.log('Item retrieved successfully:', response);
      },
      (error) => {
        // Handle get error, display an error message, etc.
        console.error('Failed to retrieve item:', error);
      }
    );
  }
  private modalService = inject(NgbModal);
  closeResult = '';

  open(content: TemplateRef<any>, actionType: string, item?: any) {
    this.actionType = actionType;
    if (this.actionType === 'Edit') {
      this.newBudget.title = item.title;
      this.newBudget.amount = item.amount;
      this.newBudget._id = item._id;
    }
     this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
    this.modalRef.result.then(
      (result:any) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason:any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    console.log(reason);
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
  onSubmit(){
    console.log(this.actionType);
    if(this.actionType === 'Add'){
      if(this.newBudget.title === '' || this.newBudget.amount === null || this.newBudget.amount === ''){
        swal.fire("Error!", "Please fill all the fields" , "error");
        return;
      }
      this.addBudgetItem();
    }else if(this.actionType === 'Edit'){
      if(this.newBudget.title === '' || this.newBudget.amount === null || this.newBudget.amount === ''){
        swal.fire("Error!", "Please fill all the fields" , "error");
        return;
      }
     this.editBudgetItem(this.newBudget);
    }

  }
}
