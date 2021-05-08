// Parser
// Lexer and parser that specifies the rules, tokens, and grammar
// Inputs: does not receive parameters
// Output: parser to be check user inputs (used by test files)
// Used by: all test files (inside tests folder)

const Parser = require('jison').Parser

const grammar = {
	lex: {
		macros: {
			// Foundations
			digit: '[0-9]',
			digits: '{digit}+',
			letter: '[a-zA-Z]',
			letters: '{letter}+',

			// Spacing
			blank: ' ',
			tab: `\t`,
			newline: `\n`,
			whitespace: `\s`,
		},
		rules: [
			['\\s+', '/* skip whitespace */'],

			// General reserved words
			['program', "return 'PROGRAM'"],
			['main', "return 'MAIN'"],
			['var', "return 'VAR'"],

			// Class reserved words
			['class', "return 'CLASS'"],
			['extends', "return 'EXTENDS'"],
			['attributes', "return 'ATTRIBUTES'"],
			['methods', "return 'METHODS'"],

			// Function reserved words
			['void', "return 'VOID'"],
			['func', "return 'FUNC'"],
			['return', "return 'RETURN'"],

			// Types
			['int', "return 'INT'"],
			['float', "return 'FLOAT'"],
			['char', "return 'CHAR'"],

			// IO
			['read', "return 'READ'"],
			['print', "return 'PRINT'"],

			// Control reserved words
			['if', "return 'IF'"],
			['else', "return 'ELSE'"],

			// Iteration reserved words
			['while', "return 'WHILE'"],
			['for', "return 'FOR'"],
			['until', "return 'UNTIL'"],

			// IDs
			['{letter}({letter}|{digit})*', "return 'ID'"],

			// Literals
			['{digits}\\.{digits}', "return 'FLOAT_CTE'"],
			['{digits}', "return 'INT_CTE'"],
			['\\"({letters}|{digits}|{blank})+\\"', "return 'STRING_CTE'"],

			['\\<-', "return '<-'"],
			['\\->', "return '->'"],

			// Relational Operators
			['\\<', "return '<'"],
			['\\>', "return '>'"],
			['\\==', "return '=='"],
			['\\=', "return '='"],
			['\\!=', "return '!='"],
			['&', "return '&'"],
			['\\|', "return '|'"],

			// Arithmetic Operators
			['\\*', "return '*'"],
			['\\/', "return '/'"],
			['-', "return '-'"],
			['\\+', "return '+'"],

			// Brackets
			['\\(', "return '('"],
			['\\)', "return ')'"],
			['\\{', "return '{'"],
			['\\}', "return '}'"],
			['\\[', "return '['"],
			['\\]', "return ']'"],

			// Punctuation
			['\\:', "return ':'"],
			['\\;', "return ';'"],
			['\\,', "return ','"],
			['\\.', "return '.'"],

			['[{blank}{tab}{newline}{whitespace}]', "return 'WS'"],
			['$', "return 'EOF'"],

			['.', "return 'error'"],
		],
	},

	bnf: {
		initial: [['program', 'return $1']],

		program: [
			[
				'program_keyword program_id_keyword ; classes dec_vars funcs MAIN ( ) { statements } EOF',
				'delete_func_directory(); delete_class_directory(); delete_constants_directory(); reset_virtual_memory(); $$ = true',
			],
		],

		program_keyword: [
			['PROGRAM', 'create_func_directory(); create_class_directory(); create_constants_directory()'],
		],

		program_id_keyword: [['ID', 'add_program_id($1)']],

		classes: [
			[
				'CLASS class_id_keyword { attributes methods }',
				'finish_class_dec(); $$',
			],
			[
				'CLASS class_id_keyword EXTENDS ID { attributes methods }',
				'finish_class_dec(); $$',
			],
			['', '$$'],
		],

		class_id_keyword: [['ID', 'add_class_id($1)']],

		attributes: [
			['attributes_keyword <- simple_var_list ->', 'finish_attr_dec();'],
		],

		attributes_keyword: [['ATTRIBUTES', 'start_attributes_dec();']],

		methods: [['METHODS <- funcs ->', '$$']],

		dec_vars: [
			[
				'VAR <- simple_type simple_id_dec simple_id_list ; dec_vars_list ->',
				'$$',
			],
			[
				'VAR <- compound_type compound_id_dec compound_id_list ; dec_vars_list ->',
				'$$',
			],
			['', '$$'],
		],

		dec_vars_list: [
			['simple_type simple_id_dec simple_id_list ; dec_vars_list', '$$'],
			['compound_type compound_id_dec compound_id_list ; dec_vars_list', '$$'],
			['', '$$'],
		],

		simple_var_list: [
			['simple_type simple_id_dec simple_id_list ; simple_var_list', '$$'],
			['', '$$'],
		],

		compound_var_list: [
			[
				'compound_type compound_id_dec compound_id_list ; compound_var_list',
				'$$',
			],
			['', '$$'],
		],

		simple_id_list: [
			[', simple_id_dec simple_id_list', '$$'],
			['', '$$'],
		],

		simple_id_dec: [
			['var_id', '$$'],
			['var_id_array', '$$'],
			['var_matrix', '$$'],
		],

		var_id: [['ID', 'add_id($1)']],

		var_id_array: [['ID [ INT_CTE ]', 'add_id_array($1, $3)']],

		var_matrix: [['ID [ INT_CTE ] [ INT_CTE ]', 'add_id_matrix($1, $3, $6)']],

		compound_id_list: [
			[', compound_id_dec compound_id_list', '$$'],
			['', '$$'],
		],

		compound_id_dec: [['var_id', '$$']],

		simple_type: [
			['INT', 'set_current_type($1)'],
			['FLOAT', 'set_current_type($1)'],
			['CHAR', 'set_current_type($1)'],
		],

		compound_type: [['ID', 'set_current_type($1)']], // For classes

		funcs: [
			['func funcs', '$$'],
			['', '$$'],
		],

		func: [
			[
				'void_keyword FUNC func_id_keyword ( params closing_params_parenthesis dec_vars starting_func_brace func_statements closing_func_brace',
				'finish_func_dec(); $$',
			],
			[
				'simple_type FUNC func_id_keyword ( params closing_params_parenthesis dec_vars starting_func_brace func_statements closing_func_brace',
				'finish_func_dec(); $$',
			],
		],

		void_keyword: [['VOID', 'set_current_type($1)']],

		func_id_keyword: [['ID', 'add_func_id($1)']],

		params: [
			[
				'VAR <- simple_type simple_id_dec simple_id_list ; simple_var_list ->',
				'$$',
			],
			['', '$$'],
		],

		closing_params_parenthesis: [
			[')', 'create_params_directory(); mark_params_size()'],
		],

		starting_func_brace: [['{', 'mark_local_vars_size(); mark_func_start()']],

		closing_func_brace: [['}', 'mark_func_end()']],

		func_statements: [['statements return_statement', '$$']],

		return_statement: [
			['RETURN expression ; func_statements', '$$'],
			['', '$$'],
		],

		statements: [
			['statement statements', '$$'],
			['', '$$'],
		],

		statement: [
			['assignment', '$$'],
			['void_func_call', '$$'],
			['io', '$$'],
			['control', '$$'],
			['iteration', '$$'],
		],

		// expression
		expression: [
			['bool_exp or_operation', 'add_or_operation()'],
			// ['bool_exp | expression', 'add_operator($2)'],
		],

		or_operation: [
			['or_operator right_bool_exp or_operation', '$$'],
			['', 'add_or_operation()'],
		],

		right_bool_exp: [['bool_exp', 'add_or_operation()']],

		or_operator: [['|', 'add_operator($1)']],

		// bool_exp
		bool_exp: [['general_exp and_operation', '$$']],

		and_operation: [
			['and_operator right_general_exp and_operation', '$$'],
			['', 'add_and_operation()'],
		],

		right_general_exp: [['general_exp', 'add_and_operation()']],

		and_operator: [['&', 'add_operator($1)']],

		// general_exp
		general_exp: [
			['exp', '$$'],
			['general_exp_compound', '$$'],
		],

		general_exp_compound: [
			['exp gt_operator exp', 'add_rel_operation()'],
			['exp lt_operator exp', 'add_rel_operation()'],
			['exp equals_operator exp', 'add_rel_operation()'],
			['exp not_equals_operator exp', 'add_rel_operation()'],
		],

		gt_operator: [['>', 'add_operator($1)']],

		lt_operator: [['<', 'add_operator($1)']],

		equals_operator: [['==', 'add_operator($1)']],

		not_equals_operator: [['!=', 'add_operator($1)']],

		// exp
		exp: [['term add_sub_operation', '$$']],

		add_sub_operation: [
			['add_operator right_term add_sub_operation', '$$'],
			['sub_operator right_term add_sub_operation', '$$'],
			['', 'add_sum_sub_operation()'],
		],

		right_term: [['term', 'add_sum_sub_operation()']],

		add_operator: [['+', 'add_operator($1)']],

		sub_operator: [['-', 'add_operator($1)']],

		// term
		term: [['factor mult_div_operation', '$$']],

		mult_div_operation: [
			['mult_operator right_factor mult_div_operation', '$$'],
			['div_operator right_factor mult_div_operation', '$$'],
			['', 'add_mult_div_operation()'],
		],

		right_factor: [['factor', 'add_mult_div_operation()']],

		mult_operator: [['*', 'add_operator($1)']],

		div_operator: [['/', 'add_operator($1)']],

		factor: [
			['left_parenthesis expression right_parenthesis', '$$'],
			['INT_CTE', `add_operand($1, 'int')`],
			['FLOAT_CTE', `add_operand($1, 'float')`],
			['var_name', '$$'],
		],

		left_parenthesis: [['(', 'start_subexpression()']],

		right_parenthesis: [[')', 'end_subexpression()']],

		assignment: [
			[
				'var_name_assignment_keyword assignment_operator expression ;',
				'assign_exp()',
			],
		],

		var_name_assignment_keyword: [['var_name', "add_operand($1, 'var')"]],

		assignment_operator: [['=', 'add_operator($1)']],

		var_name: [
			['simple_id', '$$'],
			['compound_id', '$$'],
		],

		simple_id: [
			['simple_id_keyword func_call', '$$'],
			['ID [ expression ]', `add_operand($1, 'var')`],
			['ID [ expression ] [ expression ]', `add_operand($1, 'var')`],
		],

		simple_id_keyword: [['ID', 'set_simple_id($1)']],

		compound_id: [['ID . simple_id', `add_operand($1, 'var')`]], // Objects

		func_call: [
			['', 'add_simple_id_operand()'], // If only a simple id is provided, add it to the operands stack and reset the current_simple_id variable to null
			[
				'starting_call_params_parenthesis params_call closing_call_params_parenthesis',
				'mark_func_call_end()',
			], // Call a function with a return type
		],

		func_call_id_keyword: [['ID', 'mark_func_call_start()']],

		starting_call_params_parenthesis: [
			['(', 'mark_func_call_start(); mark_call_params_start()'],
		],

		closing_call_params_parenthesis: [[')', 'verify_call_params_size()']],

		params_call: [
			['expression', 'add_call_param(); mark_next_call_param()'],
			['expression separate_params_comma params_call', '$$'],
			['', '$$'],
		],

		separate_params_comma: [[',', 'add_call_param(); mark_next_call_param()']],

		void_func_call: [
			[
				'simple_id_keyword starting_call_params_parenthesis params_call closing_call_params_parenthesis ;',
				'mark_func_call_end()',
			],
			['ID . ID ( params_call ) ;', '$$'], // Calling a method from a class
		],

		io: [
			['read', '$$'],
			['print', '$$'],
		],

		read: [['READ ( var_names ) ;', '$$']],

		var_names: [
			['var_name_read_keyword , var_names', '$$'],
			['var_name_read_keyword', '$$'],
		],

		var_name_read_keyword: [['var_name', 'read_var($1)']],

		print: [['PRINT ( print_params ) ;', '$$']],

		print_params: [
			['expression_print_keyword , print_params', '$$'],
			['expression_print_keyword', '$$'],
			['string_cte_print_keyword , print_params', '$$'],
			['string_cte_print_keyword', '$$'],
		],

		expression_print_keyword: [['expression', 'print_expression()']],

		string_cte_print_keyword: [['STRING_CTE', 'print_string($1)']],

		control: [
			['IF ( expression closing_if_parenthesis { statements } else', '$$'],
		],

		closing_if_parenthesis: [[')', 'mark_if_condition()']],

		else: [
			['else_keyword { statements }', 'mark_if_end()'],
			['', 'mark_if_end()'],
		],

		else_keyword: [['ELSE', 'mark_else()']],

		iteration: [
			['while', '$$'],
			['for', '$$'],
		],

		while: [
			[
				'while_keyword ( expression closing_while_parenthesis { statements }',
				'mark_while_end()',
			],
		],

		while_keyword: [['WHILE', 'mark_while_start()']],

		closing_while_parenthesis: [[')', 'mark_while_condition()']],

		for: [
			[
				'FOR ( for_assignment until_keyword expression closing_for_parenthesis { statements }',
				'mark_for_end()',
			],
		],

		for_assignment: [
			[
				'var_name_assignment_keyword assignment_operator expression',
				'assign_exp(); for_start_exp()',
			],
		],

		until_keyword: [['UNTIL', 'mark_until()']],

		closing_for_parenthesis: [[')', 'mark_for_condition()']],
	},
}

const parser = new Parser(grammar)

require('./functions/semantics')

module.exports = parser
