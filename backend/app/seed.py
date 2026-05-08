from .init_db import init_database
from .repository import create_entry
from .schemas import CmsEntryCreate
from .seed_data import SEED_ENTRIES


def seed_database() -> None:
    init_database()
    for item in SEED_ENTRIES:
        create_entry(CmsEntryCreate(**item))


if __name__ == "__main__":
    seed_database()
    print(f"Seeded {len(SEED_ENTRIES)} CMS entries.")
