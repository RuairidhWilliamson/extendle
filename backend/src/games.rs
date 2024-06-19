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
