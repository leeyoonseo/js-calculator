describe('계산기 애플리케이션 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다', () => {
    const firstRandomNum = randomNumber();
    const secondRandomNum = randomNumber();
    cy.get('.digit').contains(String(firstRandomNum)).click();
    cy.get('.operation').contains('+').click();
    cy.get('.digit').contains(String(secondRandomNum)).click();
    cy.get('.operation').contains('=').click();

    cy.get('#total').should('have.text', String(firstRandomNum + secondRandomNum));
    // cy.get('#total').invoke('text').should('eq', String(firstRandomNum + secondRandomNum));
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다', () => {
    const firstRandomNum = randomNumber();
    const secondRandomNum = randomNumber();
    cy.get('.digit').contains(String(firstRandomNum)).click();
    cy.get('.operation').contains('-').click();
    cy.get('.digit').contains(String(secondRandomNum)).click();
    cy.get('.operation').contains('=').click();

    cy.get('#total').should('have.text', String(firstRandomNum - secondRandomNum));
    // cy.get('#total').invoke('text').should('eq', String(firstRandomNum - secondRandomNum));
  });

  it('2개의 숫자에 대해 곱셈이 가능하다', () => {
    const firstRandomNum = randomNumber();
    const secondRandomNum = randomNumber();
    cy.get('.digit').contains(String(firstRandomNum)).click();
    cy.get('.operation').contains('x').click();
    cy.get('.digit').contains(String(secondRandomNum)).click();
    cy.get('.operation').contains('=').click();

    cy.get('#total').should('have.text', String(firstRandomNum * secondRandomNum));
    // cy.get('#total').invoke('text').should('eq', String(firstRandomNum - secondRandomNum));
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다', () => {
    cy.get('.digit').contains("6").click();
    cy.get('.operation').contains('/').click();
    cy.get('.digit').contains("2").click();
    cy.get('.operation').contains('=').click();

    cy.get('#total').should('have.text', "3");
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    cy.get('.digit').contains(String(randomNumber())).click();
    cy.get('.modifier').contains("AC").click();
    cy.get('#total').should('have.text', "0");
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    let arr = [];
    for (let i = 0; i < 5; i++) {
      let randomNum = randomNumber();
      arr.push(randomNum);
      cy.get('.digit').contains(String(randomNum)).click();
    }

    cy.get('#total').should('have.text', arr.slice(0, 3).join(''));
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    cy.get('.digit').contains("1").click();
    cy.get('.operation').contains('/').click();
    cy.get('.digit').contains("2").click();
    cy.get('.operation').contains('=').click();

    cy.get('#total').should('have.text', "0");
  });
});

function randomNumber() {
  return Math.floor(Math.random() * 9) + 1
}