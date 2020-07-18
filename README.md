# Recuperação de senha

**RF - Requisitos Funcionais**

 - O usuário deve poder recuperar sua senha informando o seu e-mail
 - O usuário deve receber um e-mail com instruções de recuperação de senha
 - O usuário deve poder resetar a sua senha

**RNF - Requisitos Não Funcionais**

- Utilizar o Mailtrap para testar envios em ambiente de dev
- Utilizar Amazom SES para envios em produção
- O envio de emails deve acontecer em segundo plano

**RN - Regras de Negócio**

- O link enviado por email para resetar a senha, deve expirar em 2h
- O usuário precisa confirmar a nova senha ao resetar a senha

# Atualização do perfil

**RF - Requisitos Funcionais**

- O usuário deve poder atualizar o seu nome, email e senha

**RN - Regras de Negócio**

- O usuário não pode alterar o seu email para um email já utilizado
- Para atualizar a sua senha, o usuário deve informar a senha antiga
- Para atualizar a sua senha, o usuário precisa confirmar a nova senha


# Painel do prestador

**RF - Requisitos Funcionais**

- O usuário deve poder listar seus agendamentos de um dia específico
- O prestador deve receber uma notificação sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificações não lidas

**RNF - Requisitos Não Funcionais**

- Os agendamentos do prestador no dia devem ser armazenados em cache
- As notificações do prestador devem ser armazenadas no MongoDB
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io

**RN - Regras de Negócio**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar

# Agendamento de Serviços

**RF - Requisitos Funcionais**

- O usuário deve poder listar todos prestadores de serviços cadastrados
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador
- O usuário deve poder listar os horários disponíveis em um dia específico de um prestador
- O Usuário deve poder realizar um novo agendamento com um novo prestador

**RNF - Requisitos Não Funcionais**

- A listagem de prestadores deve ser armazenada em cache

**RN - Regras de Negócio**

- Os agendamento devem estar disponíveis entre 8h às 18h (Primeiro às 8h, último às 17h)

- Cada Agendamento deve durar 1h exatamente
- O usuário não pode agendar em um horário já ocupado
- O usuário não pode agendar em um horário que já passou
- O usuário não pode agendar serviço consigo mesmo
