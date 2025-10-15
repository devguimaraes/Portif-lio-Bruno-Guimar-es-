# Templates JSDoc - Padrões de Documentação

Este arquivo contém templates JSDoc padronizados para diferentes tipos de funções e componentes no projeto.

## 🎯 Regras Gerais

- **Código em INGLÊS, comentários em PORTUGUÊS**
- JSDoc sempre em **PORTUGUÊS**
- Usar `@param` para parâmetros
- Usar `@returns` para valores de retorno
- Incluir `@example` quando útil
- Documentar side effects importantes

---

## 📝 Templates por Categoria

### 1. Funções Utilitárias

```typescript
/**
 * Descrição clara do que a função faz
 * @param param1 - Descrição do primeiro parâmetro
 * @param param2 - Descrição do segundo parâmetro (opcional)
 * @returns Descrição do que retorna
 * @example
 * exemploFuncao('valor', true) // "resultado esperado"
 */
function exemploFuncao(param1: string, param2?: boolean): string {
  // ...
}
```

### 2. Componentes React

```typescript
/**
 * Componente [Nome] - descrição do propósito
 * [Descrição adicional se necessário]
 * @param prop1 - Descrição da primeira prop
 * @param prop2 - Descrição da segunda prop
 * @param className - Classes CSS adicionais
 * @param children - Elementos filhos (se aplicável)
 */
function ExemploComponent({ prop1, prop2, className, children }: Props) {
  // ...
}
```

### 3. Hooks Customizados

```typescript
/**
 * Hook customizado para [funcionalidade]
 * [Descrição do comportamento e side effects]
 * @param initialValue - Valor inicial do estado
 * @returns Objeto com estado e funções de controle
 * @example
 * const { value, setValue, reset } = useExemplo('inicial')
 */
function useExemplo(initialValue: string) {
  // ...
}
```

### 4. Funções de Validação

```typescript
/**
 * Valida [tipo de dado] brasileiro
 * @param input - Valor a ser validado
 * @param format - Se deve retornar formatado (padrão: false)
 * @returns Valor válido e formatado ou null se inválido
 * @example
 * validateCPF('12345678900', true) // "123.456.789-00"
 * validateCPF('000.000.000-00') // null (CPF inválido)
 */
function validateCPF(input: string, format = false): string | null {
  // ...
}
```

### 5. Funções de Formatação

```typescript
/**
 * Formata [tipo de valor] para o padrão brasileiro
 * @param value - Valor a ser formatado
 * @param options - Opções de formatação (opcional)
 * @returns String formatada ou valor padrão se inválido
 * @example
 * formatCurrency(1234.56) // "R$ 1.234,56"
 * formatCurrency(0) // "R$ 0,00"
 */
function formatCurrency(value: number, options?: FormatOptions): string {
  // ...
}
```

### 6. Server Actions

```typescript
/**
 * Server Action para [ação específica]
 * [Descrição dos side effects: banco de dados, emails, etc.]
 * @param data - Dados validados para a ação
 * @returns Resultado da operação com success/error
 * @example
 * const result = await createUser({ name: 'João', email: 'joao@email.com' })
 * if (result.success) { ... }
 */
async function createUser(data: CreateUserInput): Promise<ActionResult<User>> {
  // ...
}
```

### 7. Funções de API/Serviços

```typescript
/**
 * Busca [dados específicos] da API externa
 * [Documentar rate limits, autenticação, etc.]
 * @param params - Parâmetros da consulta
 * @returns Promise com os dados ou erro
 * @throws {ApiError} Quando a API retorna erro
 * @example
 * const users = await fetchUsers({ page: 1, limit: 10 })
 */
async function fetchUsers(params: FetchParams): Promise<User[]> {
  // ...
}
```

### 8. Funções com Side Effects

```typescript
/**
 * [Descrição da função]
 * 
 * **SIDE EFFECTS:**
 * - Salva no localStorage
 * - Dispara evento de analytics
 * - Envia notificação push
 * 
 * @param data - Dados a serem processados
 * @returns Resultado da operação
 */
function functionWithSideEffects(data: Data): Result {
  // ...
}
```

---

## 🔧 Exemplos Práticos Implementados

### utils.ts
```typescript
/**
 * Combina classes CSS usando clsx e tailwind-merge
 * Remove classes conflitantes do Tailwind e mescla condicionalmente
 * @param inputs - Classes CSS, objetos condicionais ou arrays
 * @returns String com classes CSS otimizadas
 * @example
 * cn('px-2 py-1', 'px-4') // "py-1 px-4" (remove px-2 conflitante)
 * cn('text-red-500', { 'text-blue-500': isActive }) // condicional
 */
```

### Button Component
```typescript
/**
 * Componente Button reutilizável baseado em Radix UI
 * Suporta múltiplas variantes de estilo e tamanho
 * Pode ser renderizado como elemento filho (asChild) usando Radix Slot
 * @param className - Classes CSS adicionais
 * @param variant - Variante visual do botão (default, destructive, outline, etc.)
 * @param size - Tamanho do botão (default, sm, lg, icon, etc.)
 * @param asChild - Se true, renderiza como elemento filho usando Slot
 * @param props - Props nativas do elemento button
 */
```

### TypingEffect Component
```typescript
/**
 * Componente de efeito de digitação com cursor piscante
 * Simula digitação de texto caractere por caractere com animação de cursor
 * Suporta segmentos com cores diferentes e quebras de linha
 * @param text - Texto simples para compatibilidade (deprecated)
 * @param segments - Array de segmentos com texto e estilos específicos
 * @param speed - Velocidade da digitação em ms (padrão: 100ms)
 * @param className - Classes CSS adicionais
 * @param cursorChar - Caractere do cursor (padrão: "|")
 * @param startDelay - Delay antes de iniciar a digitação em ms
 * @param onComplete - Callback executado quando a digitação termina
 */
```

---

## ✅ Checklist de Qualidade

Antes de finalizar a documentação, verificar:

- [ ] JSDoc em português
- [ ] Todos os parâmetros documentados
- [ ] Valor de retorno documentado
- [ ] Exemplo prático incluído (quando útil)
- [ ] Side effects documentados
- [ ] Casos especiais mencionados
- [ ] Tipos TypeScript corretos