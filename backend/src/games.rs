use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct GameList {
    pub games: &'static [Game],
}

#[derive(Debug, Serialize)]
pub struct Game {
    pub id: &'static str,
    pub label: &'static str,
    pub url: &'static str,
}

pub const GAME_LIST: &GameList = &GameList {
    games: &[
        Game {
            id: "crossword",
            label: "Universal Crossword",
            url: "https://www.theglobeandmail.com/puzzles-and-crosswords/universal-crossword/",
        },
        Game {
            id: "wordle",
            label: "Wordle",
            url: "https://www.nytimes.com/games/wordle/index.html",
        },
        Game {
            id: "worldle",
            label: "Worldle",
            url: "https://worldle.teuteuf.fr",
        },
        Game {
            id: "travle",
            label: "Travle",
            url: "https://travle.earth",
        },
        Game {
            id: "wheretaken",
            label: "WhereTaken",
            url: "https://wheretaken.teuteuf.fr",
        },
        Game {
            id: "wheretakenusa",
            label: "WhereTakenUSA",
            url: "https://wheretakenusa.teuteuf.fr",
        },
        Game {
            id: "statele",
            label: "Statele",
            url: "https://statele.teuteuf.fr/",
        },
        Game {
            id: "flagle",
            label: "Flagle",
            url: "https://www.flagle.io",
        },
        Game {
            id: "framed",
            label: "Framed",
            url: "https://framed.wtf",
        },
        Game {
            id: "episode",
            label: "Episode",
            url: "https://episode.wtf",
        },
        Game {
            id: "pimantle",
            label: "Pimantle",
            url: "https://semantle.pimanrul.es",
        },
        Game {
            id: "moviedle",
            label: "Moviedle",
            url: "https://moviedle.xyz",
        },
        Game {
            id: "arcade_moviedle",
            label: "Moviedle",
            url: "https://www.moviedle.app",
        },
        Game {
            id: "semantle_junior",
            label: "Semantle Junior",
            url: "https://semantle.com/junior",
        },
        Game {
            id: "semantle",
            label: "Semantle",
            url: "https://semantle.com",
        },
        Game {
            id: "plotwords",
            label: "Plotwords",
            url: "https://plotwords.com",
        },
        Game {
            id: "rankdle",
            label: "Rankdle",
            url: "https://rankdle.com",
        },
        Game {
            id: "word_connection",
            label: "Word Connection",
            url: "https://www.thewordfinder.com/word-connection/",
        },
        Game {
            id: "quordle",
            label: "Quordle",
            url: "https://www.merriam-webster.com/games/quordle/",
        },
        Game {
            id: "redactle",
            label: "Redactle",
            url: "https://redactle.net/",
        },
        Game {
            id: "globle",
            label: "Globle",
            url: "https://globle.org/",
        },
        Game {
            id: "feudle",
            label: "Feudle",
            url: "https://googlefeud.com/feudle/",
        },
        Game {
            id: "minecraftle",
            label: "Minecraftle",
            url: "https://minecraftle.zachmanson.com/",
        },
        Game {
            id: "errordle",
            label: "Errordle",
            url: "https://bluej.org/errordle/",
        },
        Game {
            id: "myrtle",
            label: "Myrtle",
            url: "https://myrtle.harrypotterwordle.com/",
        },
        Game {
            id: "riddlele",
            label: "Riddlele",
            url: "https://phonenumble.com/riddlele/",
        },
        Game {
            id: "tuble",
            label: "Tuble",
            url: "https://tuble.co.uk/",
        },
        Game {
            id: "wordosis",
            label: "Wordosis",
            url: "https://www.medpagetoday.com/wordosis",
        },
        Game {
            id: "whentaken",
            label: "WhenTaken",
            url: "https://whentaken.com/",
        },
        Game {
            id: "connections",
            label: "Connections",
            url: "https://www.nytimes.com/connections",
        },
        Game {
            id: "faces",
            label: "Faces",
            url: "https://faces.wtf/",
        },
        Game {
            id: "deciper",
            label: "Decipher",
            url: "https://decipher.wtf/",
        },
        Game {
            id: "horsle",
            label: "Horsle",
            url: "https://horsle.glitch.me/",
        },
        Game {
            id: "minute_cryptic",
            label: "Minute Cryptic",
            url: "https://www.minutecryptic.com/",
        },
        Game {
            id: "lichess",
            label: "Lichess Puzzle",
            url: "https://lichess.org/training/daily",
        },
        Game {
            id: "factle",
            label: "Factle",
            url: "https://trivia.frontofficesports.com",
        },
        Game {
            id: "joined_words",
            label: "Joined Words",
            url: "https://jw-daily.web.app",
        },
        Game {
            id: "boardle",
            label: "Boardle",
            url: "https://playboardle.com/",
        },
        Game {
            id: "imdb250",
            label: "IMDB 250",
            url: "https://jordansp99.github.io/imdb250react/",
        },
        Game {
            id: "movie_to_movie",
            label: "Movie to Movie",
            url: "https://movietomovie.com",
        },
        Game {
            id: "geogrid",
            label: "Geogrid",
            url: "https://www.geogridgame.com",
        },
        Game {
            id: "echo_chess",
            label: "Echo Chess",
            url: "https://echochess.com/game?game_mode=DAILY&level_type=CLASSIC",
        },
        Game {
            id: "woodle",
            label: "Woodle",
            url: "https://play.woodle.today",
        },
        Game {
            id: "waffle",
            label: "Waffle",
            url: "https://wafflegame.net/daily",
        },
        Game {
            id: "3fall",
            label: "3 Fall",
            url: "https://3fallpuzzle.com",
        },
        Game {
            id: "gramjam",
            label: "Gram Jam",
            url: "https://www.gramjam.app",
        },
        Game {
            id: "spelling_bee",
            label: "Spelling Bee",
            url: "https://www.nytimes.com/puzzles/spelling-bee",
        },
        Game {
            id: "mini_crossword",
            label: "Mini Crossword",
            url: "https://www.nytimes.com/crosswords/game/mini",
        },
        Game {
            id: "upwordle",
            label: "Upwordly",
            url: "https://www.puzzlesociety.com/word-scrambles/upwordly",
        },
        Game {
            id: "worchle",
            label: "Worchle",
            url: "https://www.worchle.com",
        },
        Game {
            id: "synonym_circuit",
            label: "Synonym Circuit",
            url: "https://www.synonymcircuit.com",
        },
        Game {
            id: "guessle",
            label: "Guessle",
            url: "https://guessle.io",
        },
        Game {
            id: "karat",
            label: "Karat",
            url: "https://karat.auronymous.com",
        },
        Game {
            id: "whentake_movies",
            label: "Whentaken Movies",
            url: "https://movies.whentaken.com/game/summary",
        },
        Game {
            id: "timeguessr",
            label: "Timeguessr",
            url: "https://timeguessr.com/roundonedaily",
        },
    ],
};

#[cfg(test)]
mod tests {
    use super::GAME_LIST;

    #[test]
    fn unique_ids() {
        let ids: Vec<&'static str> = GAME_LIST.games.iter().map(|g| g.id).collect();
        for i in 1..ids.len() {
            assert!(!ids[0..i].contains(&ids[i]), "id {} is duplicated", ids[i]);
        }
    }

    #[test]
    fn snake_case_ids() {
        for g in GAME_LIST.games {
            assert!(!g.id.is_empty(), "id {} is empty", g.id);
            assert!(!g.id.contains(' '), "id {} contains space", g.id);
            assert!(!g.id.contains('-'), "id {} contains hyphen", g.id);
            assert!(
                !g.id.contains(char::is_uppercase),
                "id {} contains uppercase letter",
                g.id
            );
        }
    }

    #[test]
    fn unique_urls() {
        let urls: Vec<&'static str> = GAME_LIST.games.iter().map(|g| g.url).collect();
        for i in 1..urls.len() {
            assert!(
                !urls[0..i].contains(&urls[i]),
                "url {} is duplicated",
                urls[i]
            );
        }
    }

    #[test]
    fn label_criteria() {
        for g in GAME_LIST.games {
            assert!(!g.label.is_empty(), "label for {} is empty", g.id);
            assert!(
                !g.label.contains('_'),
                "label {} contains underscore",
                g.label
            );
            assert!(!g.label.contains('-'), "label {} contains hyphen", g.label);
        }
    }
}
