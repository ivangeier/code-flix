FROM node:20.1-slim

RUN apt update && apt install -y --no-install-recommends \
    git \
    ca-certificates \
    default-jre \
    zsh \
    curl \
    wget \
    fonts-powerline

USER node

WORKDIR /home/node/app

# Default powerline10k theme, no plugins installed
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.5/zsh-in-docker.sh)" -- \
    -t https://github.com/romkatv/powerlevel10k \
    -p git \
    -p https://github.com/zsh-users/zsh-syntax-highlighting \
    -p https://github.com/zsh-users/zsh-autosuggestions \
    -a 'export TERM=xterm-256color'

RUN echo '[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh' >> ~/.zshrc

CMD [ "sh", "-c", "npm install && tail -f /dev/null" ]