# VideoRentalStoreApp #

## 1. Opis ##

<p>Przedmiotem dokumentacji jest aplikacja webowa napisana w języku <b>C#</b>, <b>JavaScript</b> oraz bazy danych <b>MongoDB</b>. Część serwerowa jest napisana w języku C# z wykorzystaniem platformy <b>ASP.NET Core MVC</b>. Zawiera niezbędną logikę do funkcjonowania wypożyczalni filmów udostępnioną poprzez interfejs WebAPI. Część kliencka napisana jest z wykorzystaniem <b>HTML</b>, <b>CSS</b> oraz posiada kilka skryptów w języku JavaScript przy wsparciu biblioteki <b>jQuery</b> do generowania niezbędnych funkcjonalności. Jest to wypożyczalnia filmów, w której możemy wypożyczać różne filmy.</p>


## 2. Lista funkcjonalności ##

- Dodanie nowego filmu,
- Usunięcie filmu(tylko wtedy gdy nie jest wypożyczony),
- Edycja filmu,
- Dodanie nowego użytkownika,
- Usunięcie użytkownika,
- Edycja użytkownika,
- Wyświetlenie filmów,
- Wyświetlenie użytkowników,
- Wypożyczenie filmu(<b>maksymalna ilość filmów do wypożyczenia to 3</b>),
- Zwrot filmu(<b>limit czasu na zwrot wynosi 2 dni</b>),
- Wyświetlenie listy filmów konkretnego użytkownika,
- Wyświetlenie listy dostępnych filmów(<b>takie, które nie są wypożyczone</b>)
- Wyswietlenie listy dostępnych filmów tylko z najpotrzebniejszymi informacjami,
- Lista wszystkich wypożyczeń(<b>wraz z historią wypożyczeń</b>),
- Karta wypożyczeń konkretnego użytkownika,
- Konto admin
  - nieograniczony dostęp do funkcjonalości
- Konto user
  - dostęp ograniczony do:
    - Wyświetlenie dostępnych filmów,
    - Wyświetlenie moich wypożyczonych filmów,
    - Wypożyczenie konkretnego filmu
  
