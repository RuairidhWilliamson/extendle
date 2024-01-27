FROM docker.io/rust:alpine as base
RUN apk add gcc g++ git pkgconfig curl
RUN cargo install cargo-chef --locked
WORKDIR /extendle

FROM base as planner
COPY . .
RUN cargo chef prepare

FROM base as builder
COPY --from=planner /extendle/recipe.json recipe.json

RUN cargo chef cook --release
COPY . .
RUN cargo test && cargo build --release

FROM docker.io/alpine

COPY --from=builder /extendle/target/release/backend ./backend
ENTRYPOINT ["./backend"]
