export class QuestionBase<T> {
  value: T|undefined;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  options: {key: string, value: string}[];

  constructor(options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      options?: {key: string, value: string}[];
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
  }
}


export interface QuestionIntf {
  docId: string,
  formTitle: string,
  formDesc: string,
  authorName: string,
  authorEmail: string,
  recipients: string[],
  questions: {
    value?: string|undefined,
    key: string,
    label: string,
    required?: boolean,
    order?: number,
    controlType: string,
    type?: string,
    options?: {key: string, value: string}[]
  }[],
  createdAt: any

}
