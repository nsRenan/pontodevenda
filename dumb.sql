-- Criar o banco de dados
create database pdv;

-- Criar a tabela de usuários
create table usuarios (
    id serial primary key not null,
    nome text not null,
    email text unique not null,
    senha text not null
);

-- Criar a tabela de categorias
create table categorias (
    id serial primary key not null,
    descricao text not null
);

-- Inserir dados nas categorias
insert into categorias (descricao) values
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

-- Criar a tabela de produtos
create table produtos (
    id serial primary key not null,
    descricao text not null,
    quantidade_estoque integer not null,
    valor integer not null,
    categoria_id integer not null,
    foreign key (categoria_id) references categorias(id)
);

-- Criar a tabela de clientes
create table clientes (
    id serial primary key not null,
    nome text not null,
    email text unique not null,
    cpf text unique not null,
    cep text,
    rua text,
    numero text,
    bairro text,
    cidade text,
    estado text
);

-- Criar a tabela de pedidos
create table pedidos (
    id serial primary key not null,
    cliente_id integer not null,
    foreign key (cliente_id) references clientes(id),
    observacao text,
    valor_total integer not null
);

-- Criar a tabela de produtos do pedido
create table pedido_produtos (
    id serial primary key not null,
    pedido_id integer not null,
    foreign key (pedido_id) references pedidos(id),
    produto_id integer not null,
    foreign key (produto_id) references produtos(id),
    quantidade_produto integer not null,
    valor_produto integer not null
);

-- Adicionar a coluna produto_imagem à tabela de produtos
alter table produtos add column produto_imagem text;