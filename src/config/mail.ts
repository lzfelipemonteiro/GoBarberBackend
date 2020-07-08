interface IMailConfig {
  driver: 'ethereal' | 'ses'

  defaults: {
    from: {
      email: string
      name: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'contato@triangulogms.com',
      name: 'Triangulo GMS',
    },
  },
} as IMailConfig

/**
 * Configuração dos dompinis existentes para usar o servido de email.
 * Como exemplo, vou usar exemplos fictiocios da triangulo
 * defaults: {
      from: {
        email: 'contato@triangulogms.com',
        name: 'Triangulo GMS',
      },
    },
 */
