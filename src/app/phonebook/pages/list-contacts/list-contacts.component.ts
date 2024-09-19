import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhoneBookService } from '../../services/phonebook.service';
import { ToastrService } from 'ngx-toastr';
import { Contact } from '../../interceptor/Contact.service';

declare const $: any;

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css']
})
export class ListContactsComponent {
  editContactGroup = new FormGroup({
    id: new FormControl(0),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('',  [Validators.required]),
    comments: new FormControl('',  [Validators.required]),
    phoneNumber: new FormControl('',  [Validators.required, Validators.minLength(6)]),
  });
  formValidation:boolean = false;
  contacts:Contact[] = [];
  idUser!: number;
  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('confirmDeletetModal') confirmationModal!: ElementRef;
  newContact!: boolean;
  constructor( public phoneBookService: PhoneBookService, private modalService: NgbModal, public toastr: ToastrService){
   this.getContacts();
  } 

  getContacts(){
    this.phoneBookService.getAllContacts().subscribe( (res:any) => {
      if(res) this.contacts = res;
    })
  }

  save(){
    if(this.editContactGroup.valid && this.newContact) {
      const data:Contact = { 
        firstName: this.editContactGroup.value.firstName,
        lastName: this.editContactGroup.value.lastName,
        phoneNumber: this.editContactGroup.value.phoneNumber,
        comments: this.editContactGroup.value.comments,
      } as Contact;
      this.phoneBookService.saveContact(data).subscribe(res => {
        this.editContactGroup.reset();
        this.closeModal.nativeElement.click()
        this.getContacts();
        this.toastr.success('Nice', '¡Contact created!')
        return
      })
    }else if(this.editContactGroup.valid && !this.newContact){
      this.updateContact(this.editContactGroup.value.id!);
    }
    this.formValidation = true
    return
  }

  deleteContact(id:number){ 
    this.idUser = id;
  }
  confirmDelete(){
    this.phoneBookService.deleteContact(this.idUser).subscribe(
      {
        next: (res) => {
          if (res) {
            this.toastr.success('Nice', '¡Contact deleted!');
            this.getContacts();
          }
        },
        error: (error) => {
          this.toastr.warning('Ooppss!', 'Something is wrong..');
        },
        complete: () => {
          console.log('Delete request completed');
        }
      }
    )
  }

  editContact(id:number){
    this.phoneBookService.getContact(id).subscribe( (res:any) => {
       this.editContactGroup.setValue(
        {
          id: res.id,
          firstName: res.firstName,
          lastName: res.lastName, 
          comments: res.comments, 
          phoneNumber: res.phoneNumber
        }
       )
    })
  }
  cleanForm(){
    this.editContactGroup.reset()
  }
  updateContact(id:number){
    if(this.editContactGroup.valid) {
    const data:Contact = { 
      id: this.editContactGroup.value.id!,
      firstName: this.editContactGroup.value.firstName,
      lastName: this.editContactGroup.value.lastName,
      phoneNumber: this.editContactGroup.value.phoneNumber,
      comments: this.editContactGroup.value.comments,
    } as Contact;
    this.phoneBookService.updateContact(id, data).subscribe( 
      {
        next: (res) => {
        this.toastr.success('Nice', '¡Contact updated!')
        this.closeModal.nativeElement.click()
        this.getContacts()
      },
      error: (error) => { this.toastr.warning('Ooppss!', 'Something is wrong..');},
      complete: ()=> console.log('Delete request completed')
      })
    }
    this.formValidation = true;
 }
}
