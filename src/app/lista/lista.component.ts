import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export class Atividades {
  Value: string;
  icon: string;

  constructor(Value: string, icon?: string) { // icone como parâmetro opcional >> ?
    this.Value = Value;
    this.icon = icon;
  }
}

@Component({
  selector: 'lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})

export class ListaComponent {
  modalRef: BsModalRef;

  iconeValor: string;

  end: number;

  title = 'todo-list';

  Atividades: Atividades[] = new Array();

  editaraAtividade: boolean = false;

  novaAtividade = new Atividades('');

  atividadeEditada = new Atividades('');


  constructor(private modalService: BsModalService, private modal: NgbModal) {
    this.Atividades.push(
      new Atividades("Primeira atividade", 'fa fa-coffee'),
      new Atividades("Segunda atividade", 'fa fa-coffee'),
      new Atividades("Terceira atividade", 'fa fa-coffee'),
      new Atividades("Quarta atividade", 'fa fa-coffee'),
      new Atividades("Quinta atividade", 'fa fa-coffee')
    );
  }

  openModal(template: TemplateRef<any>) {
    this.zerarAtividade();
    this.modalRef = this.modalService.show(template);

  }

  adicionarAtividade() {
    this.Atividades.push(
      JSON.parse(JSON.stringify(this.novaAtividade))
    );
    this.modalRef.hide();

  }

  deletarAtividade(atividade) {
    let posicaoAtividade = this.Atividades.indexOf(atividade);
    this.Atividades.splice(posicaoAtividade, 1);
  }

  @ViewChild('editar')
  public editarRef: TemplateRef<any>;

  editarAtividade(atividade) {
    this.zerarAtividade();
    this.openModal(this.editarRef);
    this.novaAtividade.Value = this.Atividades[this.Atividades.indexOf(atividade)].Value;
    this.novaAtividade.icon = this.Atividades[this.Atividades.indexOf(atividade)].icon;
    this.atividadeEditada = JSON.parse(JSON.stringify(atividade));
    this.end = this.Atividades.indexOf(atividade);
    this.editaraAtividade = true;
  }

  atualizarAtividade() {
    this.atividadeEditada.Value = this.novaAtividade.Value;
    this.Atividades[this.end].Value = this.atividadeEditada.Value;
    this.atividadeEditada.icon = this.novaAtividade.icon;
    this.Atividades[this.end].icon = this.atividadeEditada.icon;
    this.end = null;
    this.zerarAtividade();
    this.modalRef.hide();
  }

  zerarAtividade() {
    this.novaAtividade.Value = '';
    this.novaAtividade.icon = '';
  }


}
