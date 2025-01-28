"""empty message

Revision ID: 806521eccb29
Revises: 9dcf54dd9a62
Create Date: 2025-01-28 19:58:13.522056

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '806521eccb29'
down_revision = '9dcf54dd9a62'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('character_favorites', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('character_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'characters', ['character_id'], ['id'])
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'])

    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('post_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'])
        batch_op.create_foreign_key(None, 'posts', ['post_id'], ['id'])

    with op.batch_alter_table('followers', schema=None) as batch_op:
        batch_op.add_column(sa.Column('follower_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('following_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'users', ['following_id'], ['id'])
        batch_op.create_foreign_key(None, 'users', ['follower_id'], ['id'])

    with op.batch_alter_table('planets_favorites', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('planet_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'planets', ['planet_id'], ['id'])
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('planets_favorites', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('planet_id')
        batch_op.drop_column('user_id')

    with op.batch_alter_table('followers', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('following_id')
        batch_op.drop_column('follower_id')

    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('post_id')
        batch_op.drop_column('user_id')

    with op.batch_alter_table('character_favorites', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('character_id')
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###
