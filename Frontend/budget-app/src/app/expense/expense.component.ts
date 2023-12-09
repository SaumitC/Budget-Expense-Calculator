import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  public actionType = 'Add';
  newExpense: any = { budgetId: '', amount: null , description: '', name: '' ,date: ''};
  expenses : any[] = [
  ];
  budgets : any[] = [
  ];
  showAddExpenseModal: boolean = false;
  modalRef: any;
  constructor(private expenseService :ExpenseService ) { }
  ngOnInit(): void {
    this.getExpenseItems();
  }

  addExpenseItem() {
    const newItem = { budgetId: this.newExpense.budgetId, amount: this.newExpense.amount, description: this.newExpense.description, name: this.newExpense.name ,date: this.newExpense.date };
    console.log(newItem);
    this.expenseService.addExpenseItem(newItem).subscribe(
      (response:any) => {
        // Handle successful addition, e.g., refresh the list
       this.getExpenseItems();
        console.log('Item added successfully:', response);
        swal.fire('Success!', response.message, 'success');
        this.modalRef.close();
      },
      (error) => {
        // Handle addition error, display an error message, etc.
        console.error('Failed to add item:', error);
      }
    );
  }

  editExpenseItem(item: any) {
    this.expenseService.updateExpenseItem(item).subscribe(
      (response) => {
        // Handle successful update, e.g., refresh the list
        console.log('Item updated successfully:', response);
        this.getExpenseItems();
        this.modalRef.close();
        swal.fire('Success!', response.message, 'success');
      },
      (error) => {
        // Handle update error, display an error message, etc.
        console.error('Failed to update item:', error);
      }
    );
  }

  deleteExpenseItem(item: any) {
    this.expenseService.deleteExpenseItem(item).subscribe(
      (response) => {
        // Handle successful deletion, e.g., refresh the list
        this.expenses = this.expenses.filter((i) => i !== item);
        console.log('Item deleted successfully:', response);
        swal.fire('Success!', response.message, 'success');
      },
      (error) => {
        // Handle deletion error, display an error message, etc.
        console.error('Failed to delete item:', error);
      }
    );
  }
  getExpenseItems() {
    this.expenseService.getExpenseItems().subscribe(
      (response) => {
        // Handle successful get, e.g., refresh the list
        console.log(response);
        this.expenses = response.data.expenses;
        this.budgets = response.data.budgets;
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
      this.newExpense._id = item._id;
      this.newExpense.budget = item.budget;
      this.newExpense.amount = item.amount;
      this.newExpense.description = item.description;
      this.newExpense.name = item.name;
      this.newExpense.budgetId = item._id;
      this.newExpense.date = item.date;
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
      if(this.newExpense.budget === '' || this.newExpense.amount === null  || this.newExpense.amount === '' || this.newExpense.description === '' || this.newExpense.name === '' || this.newExpense.date === ''){
        alert('Please fill all the fields');
      }else{
        this.addExpenseItem();
      }
    }else if(this.actionType === 'Edit'){
      if(this.newExpense.budget === '' || this.newExpense.amount === null || this.newExpense.amount === '' || this.newExpense.description === '' || this.newExpense.name === '' || this.newExpense.date === ''){
        alert('Please fill all the fields');
      }
      this.editExpenseItem(this.newExpense);
    }
  }
}
