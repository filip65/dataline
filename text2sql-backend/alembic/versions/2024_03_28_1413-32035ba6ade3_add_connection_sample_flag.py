"""add connection sample flag

Revision ID: 32035ba6ade3
Revises: 1ee503ad6653
Create Date: 2024-03-28 14:13:43.263403

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "32035ba6ade3"
down_revision: Union[str, None] = "1ee503ad6653"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("connections", schema=None) as batch_op:
        batch_op.add_column(sa.Column("is_sample", sa.Boolean(), server_default="false", nullable=False))

    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("connections", schema=None) as batch_op:
        batch_op.drop_column("is_sample")

    # ### end Alembic commands ###