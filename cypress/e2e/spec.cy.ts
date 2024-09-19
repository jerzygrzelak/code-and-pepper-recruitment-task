describe('template spec', () => {
  it('Visit the app', () => {
    cy.visit('localhost:4200')
  });

  describe('Game Cards - Initial State', () => {
    it('should display "Press Play to start!" text and the Star Wars logo when the game is not started', () => {
      cy.get('[data-testid="mat-card"]').each(card => {
        cy.wrap(card).should('contain.text', 'Press Play to start!');
      });

      cy.get('[data-testid="mat-card"]').each(card => {
        cy.wrap(card).find('img[alt="Star Wars logo"]').should('exist');
      });
    });
  });

  describe('Play Button', () => {
    it('should disable the button and display the spinner at the start of the game when data is loading', () => {
      cy.get('[data-testid="play-button"]').should('be.disabled');

      cy.get('[data-testid="play-button"] mat-spinner').should('be.visible');
    });


    it('should change the button text to "Next round" and show the replay icon after clicking', () => {
      cy.get('[data-testid="play-button"]').should('not.be.disabled')

      cy.get('[data-testid="play-button"]').click();

      cy.get('[data-testid="play-button"] b').should('have.text', 'Next round');

      cy.get('[data-testid="play-button"] mat-icon')
        .should('have.attr', 'aria-label', 'Replay icon')
        .should('be.visible');
    });
  });

  describe('Game Mode Selection', () => {
    it('should have "People" as the default option in the dropdown', () => {
      cy.get('[data-testid="game-mode-select"]').should('have.text', 'People');
    });

    it('should show the "Starships" option when the dropdown is opened', () => {
      cy.get('[data-testid="game-mode-select"]').click();

      cy.get('mat-option').contains('Starships').should('be.visible');

      cy.get('body').click(0,0);
    });
  });

  describe('Game Cards - People Mode', () => {
    it('should display two cards and an h1 element with text "VS"', () => {
      cy.get('[data-testid="mat-card"]').should('have.length', 2);

      cy.get('h1').should('contain.text', 'VS');
    });

    it('should display details for People in both cards at the start of the game', () => {
      cy.get('[data-testid="mat-card"]').first().within(() => {
        cy.get('[data-testid="mass"]').should('contain.text', 'Mass:');
        cy.get('[data-testid="height"]').should('contain.text', 'Height:');
        cy.get('[data-testid="birth-year"]').should('contain.text', 'Birth year:');
        cy.get('[data-testid="gender"]').should('contain.text', 'Gender:');
      });

      cy.get('[data-testid="mat-card"]').eq(1).within(() => {
        cy.get('[data-testid="mass"]').should('contain.text', 'Mass:');
        cy.get('[data-testid="height"]').should('contain.text', 'Height:');
        cy.get('[data-testid="birth-year"]').should('contain.text', 'Birth year:');
        cy.get('[data-testid="gender"]').should('contain.text', 'Gender:');
      });
    });

    it('should determine which card has the greater mass and is highlighted (highlighting both in case of a draw)', () => {
      cy.get('[data-testid="mat-card"]').eq(0)
        .find('[data-testid="mass"]')
        .invoke('text')
        .then(text => parseFloat(text.replace('Mass:', '').replace('kg', '').trim()))
        .as('massCard1');

      cy.get('[data-testid="mat-card"]').eq(1)
        .find('[data-testid="mass"]')
        .invoke('text')
        .then(text => parseFloat(text.replace('Mass:', '').replace('kg', '').trim()))
        .as('massCard2');

      cy.get('@massCard1').then(massCard1 => {
        cy.get('@massCard2').then(massCard2 => {
          if (massCard1 > massCard2) {
            cy.get('[data-testid="mat-card"]').eq(0).should('have.class', 'winner-highlight');
            cy.get('[data-testid="mat-card"]').eq(1).should('not.have.class', 'winner-highlight');
          } else if (massCard2 > massCard1) {
            cy.get('[data-testid="mat-card"]').eq(1).should('have.class', 'winner-highlight');
            cy.get('[data-testid="mat-card"]').eq(0).should('not.have.class', 'winner-highlight');
          } else {
            cy.get('[data-testid="mat-card"]').each(($card) => {
              cy.wrap($card).should('have.class', 'winner-highlight');
            });
          }
        });
      });
    });
  });

  describe('Game Cards - Starships Mode', () => {
    it('should display starship data correctly when game mode is changed and play is pressed', () => {
      cy.get('[data-testid="game-mode-select"]').click();
      cy.get('mat-option').contains('Starships').click({force: true});

      cy.get('[data-testid="play-button"]').click();

      cy.get('[data-testid="mat-card"]').should('have.length', 2);

      cy.get('[data-testid="mat-card"]').eq(0).within(() => {
        cy.get('[data-testid="crew"]').should('exist').invoke('text').should('not.be.empty');
        cy.get('[data-testid="passengers"]').should('exist').invoke('text').should('not.be.empty');
        cy.get('[data-testid="manufacturer"]').should('exist').invoke('text').should('not.be.empty');
        cy.get('[data-testid="price"]').should('exist').invoke('text').should('not.be.empty');
      });

      cy.get('[data-testid="mat-card"]').eq(1).within(() => {
        cy.get('[data-testid="crew"]').should('exist').invoke('text').should('not.be.empty');
        cy.get('[data-testid="passengers"]').should('exist').invoke('text').should('not.be.empty');
        cy.get('[data-testid="manufacturer"]').should('exist').invoke('text').should('not.be.empty');
        cy.get('[data-testid="price"]').should('exist').invoke('text').should('not.be.empty');
      });
    });

    it('should determine which card has the greater crew number and is highlighted (highlighting both in case of a draw)', () => {
      cy.get('[data-testid="mat-card"]').eq(0)
        .find('[data-testid="crew"]')
        .invoke('text')
        .then(text => parseInt(text.replace('Crew:', '').trim()))
        .as('crewCard1');

      cy.get('[data-testid="mat-card"]').eq(1)
        .find('[data-testid="crew"]')
        .invoke('text')
        .then(text => parseInt(text.replace('Crew:', '').trim()))
        .as('crewCard2');

      cy.get('@crewCard1').then(crewCard1 => {
        cy.get('@crewCard2').then(crewCard2 => {
          if (crewCard1 > crewCard2) {
            cy.get('[data-testid="mat-card"]').eq(0).should('have.class', 'winner-highlight');
            cy.get('[data-testid="mat-card"]').eq(1).should('not.have.class', 'winner-highlight');
          } else if (crewCard2 > crewCard1) {
            cy.get('[data-testid="mat-card"]').eq(1).should('have.class', 'winner-highlight');
            cy.get('[data-testid="mat-card"]').eq(0).should('not.have.class', 'winner-highlight');
          } else {
            cy.get('[data-testid="mat-card"]').each(($card) => {
              cy.wrap($card).should('have.class', 'winner-highlight');
            });
          }
        });
      });
    });
  });

  describe('Round Counter', () => {
    it('should increase the round number after clicking the play button', () => {
      cy.get('h4').contains('Round').invoke('text').then((text: string) => {
        const initialRoundNumber = parseInt(text.match(/\d+/)[0]);

        cy.get('[data-testid="play-button"]').click();

        cy.get('h4').contains('Round').invoke('text').then((newText: string) => {
          const newRoundNumber = parseInt(newText.match(/\d+/)[0]);
          expect(newRoundNumber).to.be.greaterThan(initialRoundNumber);
        });
      });
    });
  });

  describe('Score Counter', () => {
    const playAndVerifyScores = () => {
      cy.get('.score-counter-container')
        .find('h2')
        .invoke('text')
        .then((text: string) => {
          const [player1Score, player2Score] = text.split(':').map(score => parseInt(score.trim()));

          cy.wrap({ player1Score, player2Score }).as('currentScores');
        });

      cy.get('[data-testid="play-button"]').click();

      cy.wait(100);

      cy.get('[data-testid="mat-card"]').eq(0)
        .find('[data-testid="crew"]')
        .invoke('text')
        .then((text: string) => parseInt(text.replace('Crew:', '').trim()))
        .as('crewCard1');

      cy.get('[data-testid="mat-card"]').eq(1)
        .find('[data-testid="crew"]')
        .invoke('text')
        .then((text: string)=> parseInt(text.replace('Crew:', '').trim()))
        .as('crewCard2');

      cy.get('@crewCard1').then((crewCard1: number) => {
        cy.get('@crewCard2').then((crewCard2: number) => {
          cy.get('@currentScores').then(({ player1Score, player2Score }) => {
            let expectedPlayer1Score = player1Score;
            let expectedPlayer2Score = player2Score;

            if (crewCard1 > crewCard2) {
              expectedPlayer1Score += 1;
            } else if (crewCard1 < crewCard2) {
              expectedPlayer2Score += 1;
            } else {
              expectedPlayer1Score += 1;
              expectedPlayer2Score += 1;
            }

            cy.get('.score-counter-container')
              .find('h2')
              .invoke('text')
              .should('equal', `${expectedPlayer1Score} : ${expectedPlayer2Score}`);
          });
        });
      });
    };

    it('should play the game three times and verify scores are updated correctly', () => {
      Cypress._.times(3, () => {
        playAndVerifyScores();
      });
    });
  });

})
