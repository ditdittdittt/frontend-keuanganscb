export default {
  alert: {
    error: 'an error occured: ',
    login: {
      success: 'login successful',
      error: 'login failed',
      warning: 'incorrect email or password'
    },
    update: {
      success: 'data updated successfully',
      error: 'failed to update data'
    },
    delete: {
      success: 'data deleted successfully',
      error: 'failed to delete data'
    },
    detail: {
      sign: 'process failed, signature needed',
      getError: 'failed to send data to the server'
    },
    formPetty: {
      success: 'Success created a petty cash form',
      failed: 'Failed create a petty cash form'
    },
    formRequest: {
      success: 'Success created a request form',
      failed: 'Failed create a request form',
      error: 'Error occured when validating data',
      overBalance: 'the requested fund is greater than the available balance'
    },
    formSubmission: {
      success: 'Success created a submission form',
      failed: 'Failed create a submission form',
      error: 'Error occured when validating data'
    },
    managementBank: {
      save: 'Account has been saved',
      delete: 'Account has been deleted',
      store: 'Form is not valid'
    },
    managementBudget: {
      save: 'Budget code has been saved',
      delete: 'Budget code has been deleted',
      store: 'Form is not valid'
    },
    managementUser: {
      update: 'User updated',
      show: 'Failed to show list of user'
    },
    validation: {
      textTooLong: 'Text too long'
    }
  },
  components: {
    button: {
      text: 'button',
      login: 'login',
      logout: 'logout',
      save: 'save',
      reset: 'reset',
      submit: 'submit',
      add: 'add',
      delete: 'delete',
      cancel: 'cancel',
      done: 'done',
      close: 'close',
      update: 'update',
      sure_button_yes: 'yes',
      sure_button_no: 'no',
      already_paid: 'already paid',
      reject: 'reject',
      need_submission: 'does this form need submission?'
    },
    row: {
      text: 'row'
    },
    table: {
      title: {
        request: 'request table',
        submission: 'submission table',
        petty_cash: 'petty cash table',
        budget_code: 'budget code table',
        role: 'role table',
        user: 'user table',
        bank: 'bank table'
      },
      subtitle: {
        request: 'list requesting fund',
        submission: 'list submission fund',
        petty_cash: 'list petty cash',
        budget_code: 'list budget code',
        role: 'list of role',
        user: 'list of user',
        bank: 'list of bank'
      }
    },
    form: {
      title: {
        request: 'form fund request',
        submission: 'form fund submission',
        petty_cash: 'form petty cash',
        role: 'form role',
        budget_code: 'form budget code',
        bank: 'form bank account'
      },
      subtitle: {
        request: 'fill this form to create request form',
        submission: 'fill this form to create submission form',
        petty_cash: 'fill this form to create petty cash form',
        role: 'fill this form to create role',
        budget_code: 'fill this form to create budget code form',
        bank: 'fill this form to create bank account'
      }
    }
  },
  text: {
    language: 'language',
    request: 'request',
    pic: 'person in charge',
    division: 'division',
    cash: 'cash',
    transfer: 'transfer',
    date: 'date',
    budget_code: 'budget code',
    budget_name: 'budget name',
    budget_nominal: 'budget nominal',
    allocation: 'allocation',
    amount: 'amount',
    balance: 'balance',
    note: 'note',
    additional_file: 'additional file',
    attachment_file: 'attachment file',
    fund: 'fund',
    submission: 'submission',
    use: 'use',
    petty_cash: 'petty cash',
    amount_in_word: 'amount in word',
    setting: 'setting',
    theme: 'theme',
    light: 'light',
    dark: 'dark',
    mode: 'mode',
    color: 'color',
    primary: 'primary',
    secondary: 'secondary',
    accent: 'accent',
    form: 'form',
    all: 'all',
    file: 'file',
    budget: 'budget',
    account: 'account',
    name: 'name',
    username: 'username',
    password: 'password',
    new_password: 'new password',
    old_password: 'old password',
    email: 'email',
    job: 'job',
    position: 'position',
    additional_information: 'additional information',
    nik: 'nik',
    address: 'address',
    required: 'required',
    payment_type: 'payment type',
    verification: 'verification',
    confirmation: 'confirmation',
    head_dept: 'head dept',
    head_office: 'head office',
    manager_ops: 'manager ops',
    cashier: 'cashier',
    verificator: 'verificator',
    view: 'view',
    user: 'user',
    action: 'action',
    total_item: 'total item',
    created_at: 'created at',
    updated_at: 'updated at',
    search: 'search',
    bank_name: 'bank name',
    bank_code: 'bank code',
    account_number: 'account number',
    account_owner: 'account owner',
    status: 'status',
    sure_delete_head: 'delete this form?',
    sure_delete_body: 'this form cannot be restored',
    sure_verify_head: 'verify this form?',
    sure_verify_body: 'this form cannot be modified after verified',
    current_file: 'Current file',
    back: 'back',
    positive: 'must have a positive value',
    convert_to_image: 'converting to image',
    number: 'number',
    role: 'role',
    confirm_password: 'confirm password',
    code: 'code',
    sure_reject_head: 'reject this form?',
    sure_reject_body: 'this form cannot be restored after rejected',
    sure_paid_head: 'are you sure it is already paid?',
    sure_paid_body: 'you cannot undo after you confirm',
    paid_at: 'paid at',
    information: 'information',
    top_up: 'top up',
    nominal: 'nominal',
    sure_need_submission_head: 'does this form need submission?',
    sure_need_submission_body: 'yes if needed, no if not',
    update_balance: 'update balance',
    bank_account: 'bank account'
  },
  helper: {
    messages: {
      attachment_file: 'click to choose file',
      amount_in_word: 'automatically filled',
      auto: 'automatically filled'
    },
    name: 'full name',
    username: 'alias or nickname',
    email: 'use correct email',
    wrong_email: 'email format is not correct',
    password: 'use strong password',
    confirm_password: 're-type your password',
    different_password: 'password does not match',
    division: 'current division you are working in office',
    role: 'your role in this software',
    nik: 'identity number in your id card',
    address: 'your residential address',
    multiple_bank: 'separate with commas for multiple data'
  },
  export: {
    pdf: 'export to PDF',
    excel: 'export to Excel'
  }
}
